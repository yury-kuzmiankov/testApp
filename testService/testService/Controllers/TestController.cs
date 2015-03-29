using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testService.Services;
using testService.Models;

namespace testService.Controllers
{
    public class TestController : Controller
    {
        //
        // GET: /Test/

        public ActionResult getTestsByUser(int id)
        {
            TestService service = new TestService();
            List<Test> tests = service.getTestsByUser(id);
            return Json(tests, JsonRequestBehavior.AllowGet);
        }
    }
}
