namespace Alexandria
{
	using System.Web.Http;

	public static class WebApiConfig
	{
		public static void Register(HttpConfiguration config)
		{
			config.Routes.MapHttpRoute(
			                           name: "Save Book",
			                           routeTemplate: "api/books/savebook",
			                           defaults: new { controller = "Books", action = "SaveBook" }
				);

			config.Routes.MapHttpRoute(
			                           name: "Get image",
			                           routeTemplate: "api/books/image/{bookId}",
			                           defaults: new { controller = "Books", action = "GetBookImage" }
				);


			config.Routes.MapHttpRoute(
			                           name: "Search Books",
			                           routeTemplate: "api/books/search/{searchQuery}",
			                           defaults: new { controller = "Books", action = "SearchBooks" }
				);
			config.Routes.MapHttpRoute(
			                           name: "Top Books",
			                           routeTemplate: "api/books/top",
			                           defaults: new { controller = "Books", action = "TopBooks" }
				);

			config.Routes.MapHttpRoute(
			                           name: "All tags",
			                           routeTemplate: "api/books/getalltags",
			                           defaults: new { controller = "Books", action = "GetAllTags" }
				);


			config.Routes.MapHttpRoute(
			                           name: "Get All books by tag",
			                           routeTemplate: "api/books/getallbooksbytag/{searchTag}",
			                           defaults: new { controller = "Books", action = "GetAllBooksByTag" }
				);


			config.Routes.MapHttpRoute(
			                           name: "Create Book Copy",
			                           routeTemplate: "api/books/createbookcopy",
			                           defaults: new { controller = "Books", action = "CreateBookCopy" }
				);
			
			config.Routes.MapHttpRoute(
			                           name: "Lended Books",
			                           routeTemplate: "api/books/lendedbooks",
			                           defaults: new { controller = "Books", action = "LendedBooks" }
				);

			config.Routes.MapHttpRoute(
			                           name: "Transfer book",
			                           routeTemplate: "api/books/transferbook",
			                           defaults: new { controller = "Books", action = "TransferBook" }
				);

			config.Routes.MapHttpRoute(name: "Add request",
			                           routeTemplate: "api/books/addrequest",
			                           defaults: new { controller = "Books", action = "AddRequest" }
				);

			config.Routes.MapHttpRoute(name: "Get ratings",
			                           routeTemplate: "api/books/ratings/{bookId}",
			                           defaults: new { controller = "Books", action = "GetRatings" }
				);


			config.Routes.MapHttpRoute(name: "add rating for book",
			                           routeTemplate: "api/books/addrating",
			                           defaults: new { controller = "Books", action = "AddRating" }
				);


			config.Routes.MapHttpRoute(name: "Get requests for a book",
			                           routeTemplate: "api/books/requests/{bookId}",
			                           defaults: new { controller = "Books", action = "GetRequests" }
				);

			config.Routes.MapHttpRoute(
			                           name: "Get Book Access",
			                           routeTemplate: "api/books/access/{bookId}",
			                           defaults: new { controller = "Books", action = "GetBookAccess" }
				);
			config.Routes.MapHttpRoute(
			                           name: "Get Book",
			                           routeTemplate: "api/books/{bookId}",
			                           defaults: new { controller = "Books", action = "GetBook" }
				);
		}
	}
}