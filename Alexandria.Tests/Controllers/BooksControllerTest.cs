namespace Alexandria.Tests.Controllers
{
	using System.Security.Principal;
	using System.Web;
	using Alexandria.Controllers;
	using Alexandria.Models.Web;
	using Microsoft.VisualStudio.TestTools.UnitTesting;

	[TestClass]
	public class BooksControllerTest
	{
		public BooksControllerTest()
		{
		}

		//[TestMethod]
		//public void SaveBookResource()
		//{
		//	// Arrange
		//	var controller = new BooksController();

		//	// Act
		//	BookResource result = controller.SaveBook(new BookResource()
		//												  {
		//													  Description = "Foo",
		//													  Title = "Bar3",
		//													  ISBN = "1-2-3-4-5-6",
		//													  Tags = "A,B,C,D, E",
		//													  Image = new byte[0],
		//												  });

		//	// Assert
		//	Assert.IsNotNull(result);
		//	Assert.AreNotEqual(0, result.Id);
		//	//Assert.AreEqual(2, result.Count());
		//	//Assert.AreEqual("value1", result.ElementAt(0));
		//	//Assert.AreEqual("value2", result.ElementAt(1));
		//}

		//[TestMethod]
		//public void GetById()
		//{
		//	// Arrange
		//	ValuesController controller = new ValuesController();

		//	// Act
		//	string result = controller.Get(5);

		//	// Assert
		//	Assert.AreEqual("value", result);
		//}

		//[TestMethod]
		//public void Post()
		//{
		//	// Arrange
		//	ValuesController controller = new ValuesController();

		//	// Act
		//	controller.Post("value");

		//	// Assert
		//}

		//[TestMethod]
		//public void Put()
		//{
		//	// Arrange
		//	ValuesController controller = new ValuesController();

		//	// Act
		//	controller.Put(5, "value");

		//	// Assert
		//}

		//[TestMethod]
		//public void Delete()
		//{
		//	// Arrange
		//	ValuesController controller = new ValuesController();

		//	// Act
		//	controller.Delete(5);

		//	// Assert
		//}
	}
}