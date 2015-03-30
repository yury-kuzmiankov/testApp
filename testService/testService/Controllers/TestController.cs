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

        public ActionResult getTestsByDepartment(int id)
        {
            TestService service = new TestService();
            List<Test> tests = service.getTestsByDepartment(id);
            return Json(tests, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getTests()
        {
            TestService service = new TestService();
            List<Test> tests = service.getTests();
            return Json(tests, JsonRequestBehavior.AllowGet);
        }

        public ActionResult insert(List<Test> results)
        {
            int count = 0;
            TestService service = new TestService();
            foreach (Test result in results)
            {
                count += service.insert(result);
            }
            return Json(count, JsonRequestBehavior.AllowGet);
        }
    }
}
