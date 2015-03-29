using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testService.Models
{
    public class Test
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int TestId { get; set; }
        public int Fail { get; set; }
        public int Try { get; set; }
        public string result { get; set; }
        public DateTime dateTime { get; set; }
        public int IsDone { get; set; }
    }
}