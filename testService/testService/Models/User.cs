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
        public int Role { get; set; }
        public int Department { get; set; }
    }
}