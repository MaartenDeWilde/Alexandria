using System.Web.Mvc;
using System.Web.Routing;

namespace Alexandria
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute("Search", "Search", new { controller = "Home", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute("CreateBook", "CreateBook", new { controller = "Home", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute("TransferBook", "TransferBook/{id}", new { controller = "Home", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute("RequestBook", "RequestBook", new { controller = "Home", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute("Detail", "Detail/{id}", new { controller = "Home", action = "Index", id = UrlParameter.Optional });
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}