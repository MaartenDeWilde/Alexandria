namespace Alexandria.Models.Web
{
	using System;
	using System.Linq;

	public class BookResource
	{
		// ReSharper disable UnusedMember.Global
		public BookResource()
			// ReSharper restore UnusedMember.Global

		{
		}


		public BookResource(Book book)
		{
			this.Description = book.Description;
			this.ISBN = book.ISBN;
			this.InOrganizationSince = book.InOrganizationSince;
			this.Id = book.Id;
			//this.Image = book.Image;
			this.PendingRequests = book.PendingRequests.Count();
			this.TimesTransfered = book.TimesTransfered;
			this.Author = book.Author;
			this.Title = book.Title;
			this.Tags = string.Join(", ", book.Tags.Select(e => e.TagName));

		}

		public string Author { get; set; }

		public string ISBN { get; set; }

		public int? Id { get; set; }

		public string Tags { get; set; }

		public string Description { get; set; }

		public string Title { get; set; }

		public decimal? AverageRating { get; set; }

		public DateTime InOrganizationSince { get; set; }

		public byte[] Image { get; set; }
		public string Base64Image { get; set; }

		public int TimesTransfered { get; set; }

		public int PendingRequests { get; set; }

        public bool CanBeRequested { get; set; }
        public bool CanBeTransferred { get; set; }
	}
}