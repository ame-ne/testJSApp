using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using testJSApp.Models;

namespace testJSApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TestServiceController : Controller
    {
        private ITestService repository;

        public TestServiceController(ITestService repo, IHttpContextAccessor httpContextAccessor)
        {
            repository = repo;
        }

        [HttpGet]
        public int TestInit()
        {
            return repository.TestInit();
        }

        [HttpPost]
        public JsonResult GetNext([FromBody]int id)
        {
            return Json(repository.GetNext(id)); 
        }


    }
}