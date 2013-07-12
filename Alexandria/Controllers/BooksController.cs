namespace Alexandria.Controllers
{
	using System;
	using System.Collections.Generic;
	using System.Data.Entity;
	using System.Linq;
	using System.Net;
	using System.Web.Http;
	using Models;
	using Models.Web;

	public class BooksController : ApiController
	{
		private readonly AlexandriaEntities _dataBeastContext;

		public BooksController()
		{
			this._dataBeastContext = new AlexandriaEntities();
		}

		protected override void Dispose(bool disposing)
		{
			this._dataBeastContext.SaveChanges();
			base.Dispose(disposing);
		}

		[HttpGet]
		public IEnumerable<PendingRequestResource> GetRequests(int bookId)
		{
			return this._dataBeastContext.PendingRequests
				.Where(e => e.BookId == bookId)
				.ToList()
				.Select(e => new PendingRequestResource(e));
		}

		[HttpGet]
		public byte[] GetBookImage(int bookId)
		{
			Book book = this._dataBeastContext.Books.SingleOrDefault(e => e.Id == bookId);

			if (null == book)
			{
				throw new WebException("404");
			}
			return book.Image;
		}

		[HttpGet]
		public IEnumerable<string> GetAllTags()
		{
			return this._dataBeastContext.Tags.Select(e => e.TagName);
		}

		[HttpGet]
		public IEnumerable<BookResource> GetAllBooksByTag(string searchTag)
		{
			Tag tag = this._dataBeastContext.Tags.SingleOrDefault(e => searchTag == e.TagName);

			if (null == tag)
			{
				return Enumerable.Empty<BookResource>();
			}

			return this._dataBeastContext.Books.Where(e => e.Tags.Any(f => f.TagName == searchTag))
				.Take(20)
				.Select(this.ToBookResource);
		}

		[HttpGet]
		public IEnumerable<RatingResource> GetRatings(int bookId)
		{
			return this._dataBeastContext.Ratings.Where(e => e.BookId == bookId).ToList().Select(e => new RatingResource(e));
		}

		[HttpPost]
		public BookResource SaveBook([FromBody] BookResource bookResource)
		{
			List<Tag> serverTags = this._dataBeastContext.Tags.ToList();

			var tagsToSave = new List<Tag>();

			foreach (Tag tag in bookResource.Tags
				.Split(',')
				.Select(e => e.Trim())
				.Distinct()
				.Select(e => new Tag() { TagName = e.Trim(), }))
			{
				Tag tagToSave = serverTags.SingleOrDefault(e => tag.TagName == e.TagName);

				if (tagToSave != null)
				{
					// NOOP
				}
				else
				{
					tagToSave = this._dataBeastContext.Tags.Add(tag);
				}

				tagsToSave.Add(tagToSave);
			}


			var book = new Book()
				           {
					           Description = bookResource.Description,
					           ISBN = bookResource.ISBN,
					           InOrganizationSince = DateTime.Now,
					           Tags = tagsToSave,
					           Image = new byte[0],
					           TimesTransfered = 0,
					           Title = bookResource.Title,
					           Author = bookResource.Author
				           };


			book.BookCopies = new List<BookCopy>()
				                  {
					                  new BookCopy()
						                  {
							                  Book = book,
							                  LastTransferDate = DateTime.Now,
							                  LendedTo = User.Identity.Name,
							                  Owner = this.User.Identity.Name
						                  }
				                  };

			this._dataBeastContext.Books.Add(book);

			// Perist changes
			this._dataBeastContext.SaveChanges();

			bookResource.Id = book.Id;
			bookResource.InOrganizationSince = book.InOrganizationSince;

			return bookResource;
		}

		[HttpGet]
		public BookResource GetBook(int bookId)
		{
			Book book = this._dataBeastContext.Books.SingleOrDefault(e => e.Id == bookId);

			if (null == book)
			{
				throw new WebException("404");
			}

			return this.ToBookResource(book);
		}

		public BookAccessResource GetBookAccess(int bookId)
		{
			Book book = this._dataBeastContext.Books.SingleOrDefault(e => e.Id == bookId);

			if (null == book)
			{
				throw new WebException("404");
			}

			var bookAccessResource = new BookAccessResource()
				                         {
					                         Id = book.Id,
					                         RequestPending = book.PendingRequests.Any(pr => pr.User == this.User.Identity.Name),
					                         CopyInPosession = book.BookCopies.Any(bc => bc.LendedTo == this.User.Identity.Name),
				                         };

			return bookAccessResource;
		}

		[HttpGet]
		public IEnumerable<BookResource> SearchBooks(string searchQuery)
		{
			return this._dataBeastContext.Books
				.Where(e => e.Title.Contains(searchQuery) || e.Description.Contains(searchQuery))
				.Take(20)
				.Select(this.ToBookResource);
		}

		[HttpGet]
		public IEnumerable<BookResource> TopBooks()
		{
			return this._dataBeastContext.Books
				.Select(this.ToBookResource)
				.OrderByDescending(e => e.TimesTransfered * e.AverageRating ?? 1).Take(5);
		}

		[HttpPost]
		public PendingRequestResource AddRequest([FromBody] int bookId)
		{
			var pendingRequestResource = new PendingRequestResource
				(this._dataBeastContext.PendingRequests.Add(new PendingRequest()
					                                            {
						                                            BookId = bookId,
						                                            User = this.User.Identity.Name,
																	Date = DateTime.Now,
					                                            }));

			this._dataBeastContext.SaveChanges();

			return pendingRequestResource;
		}

		[HttpGet]
		public IEnumerable<BookResource> LendedBooks()
		{
			return this._dataBeastContext.BookCopies
				.Where(e => e.LendedTo == this.User.Identity.Name)
				.Select(e => e.Book)
				.Select(this.ToBookResource);
		}

		[HttpPost]
		public BookCopyResource CreateBookCopy([FromBody] int bookId)
		{
			var book = this._dataBeastContext.Books.SingleOrDefault(e => e.Id == bookId);

			if(null == book)
				throw new WebException("404");

			var bookCopy = new BookCopy() { BookId = bookId, LendedTo = User.Identity.Name, Owner = User.Identity.Name, LastTransferDate = DateTime.Now, };

			return new BookCopyResource(this._dataBeastContext.BookCopies.Add(bookCopy));
		}

		[HttpPost]
		public void TransferBook([FromBody] int requestId)
		{
			var pendingRequest = this._dataBeastContext.PendingRequests
				.SingleOrDefault(e => e.Id == requestId);

			if(null == pendingRequest) throw new WebException("404");

			var bookCopy =  pendingRequest
				.Book
				.BookCopies
				.FirstOrDefault(e => e.LendedTo == User.Identity.Name);

			if (null == bookCopy)
			{
				// you dont have a copy, no can transfer!
				throw new WebException("404");
			}

			// transfer actual bookCopy
			bookCopy.LendedTo = pendingRequest.User;
			bookCopy.LastTransferDate = DateTime.Now;

			bookCopy.Book.TimesTransfered++;

			_dataBeastContext.PendingRequests.Remove(pendingRequest);

			_dataBeastContext.SaveChanges();
		}

        [HttpPost]
		public RatingResource AddRating([FromBody] RatingResource ratingResource)
        {
            var entity = new Rating
                {
					BookId = ratingResource.BookId,
					Comment = ratingResource.Comment,
					RatingGiven = ratingResource.RatingGiven,
                    User = User.Identity.Name
                };
            _dataBeastContext.Ratings.Add(entity);
            _dataBeastContext.SaveChanges();
            return new RatingResource(entity);
        }

		private BookResource ToBookResource(Book book)
		{
			var ratings = this._dataBeastContext.Ratings.Where(e=>e.BookId == book.Id);


			int numberOfRatings = ratings.Count();

			decimal? averageRating = null;

			if (numberOfRatings != 0)
			{
				averageRating = ratings.Sum(e => e.RatingGiven) / numberOfRatings;
			}
	
			var bookResource = new BookResource(book)
				                   {
					                   PendingRequests = this._dataBeastContext.PendingRequests.Count(e => e.BookId == book.Id),
									   AverageRating = averageRating
				                   };

			return bookResource;
		}



		//// GET api/books
		//public IEnumerable<string> Get()
		//{
		//	return new string[] { "value1", "value2" };
		//}

		//// GET api/booksapi/5
		//public string Get(int id)
		//{
		//	return "value";
		//}

		//// POST api/booksapi
		//public void Post([FromBody]string value)
		//{
		//}

		//// PUT api/booksapi/5
		//public void Put(int id, [FromBody]string value)
		//{
		//}

		//// DELETE api/booksapi/5
		//public void Delete(int id)
		//{
		//}
	}
}
