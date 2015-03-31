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

        [HttpPost]
        public ActionResult insert(Department department)
        {
            DepartmentService service = new DepartmentService();
            int count = 0;
            if (department != null)
            {
                count = service.insertDeparnment(department);
            }
            return Json(count, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult update(Department department)
        {
            DepartmentService service = new DepartmentService();
            int count = 0;
            if (department != null)
            {
                count = service.updateDepartment(department);
            }
            return Json(count, JsonRequestBehavior.AllowGet);

        }
    }
}
