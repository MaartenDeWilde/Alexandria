namespace Alexandria.Models.Web
{
	using System;

	public class BookCopyResource
	{
		// ReSharper disable UnusedMember.Global
		public BookCopyResource()
			// ReSharper restore UnusedMember.Global
		{
		}

		public BookCopyResource(BookCopy bookCopy)
		{
			this.BookId = bookCopy.BookId;
			this.LendedTo = bookCopy.LendedTo;
			this.Owner = bookCopy.Owner;
			this.LastTransferDate = bookCopy.LastTransferDate;
			this.Id = bookCopy.Id;
		}

		public int Id { get; set; }

		public DateTime? LastTransferDate { get; set; }

		public string Owner { get; set; }

		public string LendedTo { get; set; }

		public int BookId { get; set; }
	}
}