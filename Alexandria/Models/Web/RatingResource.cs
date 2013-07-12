namespace Alexandria.Models.Web
{
	public class RatingResource
	{
		// ReSharper disable UnusedMember.Global
		public RatingResource()
			// ReSharper restore UnusedMember.Global

		{
		}

		public RatingResource(Rating rating)
		{
			this.BookId = rating.BookId;
			this.Comment = rating.Comment;
			this.RatingGiven = rating.RatingGiven;
			this.User = rating.User;
		}

		public string User { get; set; }
		public int RatingGiven { get; set; }
		public string Comment { get; set; }
		public int BookId { get; set; }
	}
}