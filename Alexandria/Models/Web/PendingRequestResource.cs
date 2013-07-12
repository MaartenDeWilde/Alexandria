namespace Alexandria.Models.Web
{
	using System;

	public class PendingRequestResource
	{
		public PendingRequestResource(PendingRequest pendingRequest)
		{
			this.BookId = pendingRequest.BookId;
			this.Date = pendingRequest.Date;
			this.User = pendingRequest.User;
			this.Id = pendingRequest.Id;
			this.Date = DateTime.Now;
		}


		// ReSharper disable UnusedMember.Global
		public PendingRequestResource()
			// ReSharper restore UnusedMember.Global

		{
		}

		public int Id { get; set; }

		public string User { get; set; }
		public DateTime Date { get; set; }
		public int BookId { get; set; }
	}
}