using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using testJSApp.Models;

namespace testJSApp.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TestServiceController : Controller
    {
        private ITestService repository;
        private ISession session;

        public TestServiceController(ITestService repo, IHttpContextAccessor httpContextAccessor)
        {
            repository = repo;
            session = httpContextAccessor?.HttpContext.Session;
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