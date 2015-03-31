using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using testService.Services;
using testService.Models;

namespace testService.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/

        public ActionResult Index()
        {
            UserService service = new UserService();
            List<User> users = service.getUsers();
            return Json(users, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getUser(string id)
        {
            UserService service = new UserService();
            List<User> users = service.getUserById(id);
            return Json(users, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult login(User userIn)
        {
            UserService service = new UserService();
            User user = service.getUserByNamePassword(userIn.Name, userIn.Password);
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        public ActionResult exists(string name)
        {
            UserService service = new UserService();
            User user = service.userExists(name);
            return Json(user, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult insert(string name, string firstName, string lastName, string password, string department)
        {
            UserService service = new UserService();
            int count = 0;
            User user = service.userExists(name);
            if (user == null)
            {
                count = service.addUser(name, firstName, lastName, password, Int32.Parse(department));
            }
            return Json(count, JsonRequestBehavior.AllowGet);
            
        }

        [HttpPost]
        public ActionResult update(User user)
        {
            UserService service = new UserService();
            int count = 0;
            if (user != null)
            {
                count = service.updateUser(user);
            }
            return Json(count, JsonRequestBehavior.AllowGet);

        }
    }
}
