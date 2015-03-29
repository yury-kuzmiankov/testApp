using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testService.Services;
using testService.Models;

namespace testService.Controllers
{
    public class DepartmentController : Controller
    {
        //
        // GET: /User/

        public ActionResult Index()
        {
            DepartmentService service = new DepartmentService();
            List<Department> departments = service.geDepartments();
            return Json(departments, JsonRequestBehavior.AllowGet);
        }
    }
}
