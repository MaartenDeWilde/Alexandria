using Cassette;
using Cassette.Scripts;
using Cassette.Stylesheets;

namespace Alexandria
{
    /// <summary>
    /// Configures the Cassette asset bundles for the web application.
    /// </summary>
    public class CassetteBundleConfiguration : IConfiguration<BundleCollection>
    {
        public void Configure(BundleCollection bundles)
        {
            bundles.Add<StylesheetBundle>("Content/css");
        }
    }
}