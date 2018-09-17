using Microsoft.AspNetCore.Mvc;

namespace testJSApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}