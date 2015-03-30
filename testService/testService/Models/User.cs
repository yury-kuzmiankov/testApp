using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testService.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public Department department{ get; set; }
    }
}