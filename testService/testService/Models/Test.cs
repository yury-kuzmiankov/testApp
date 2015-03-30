using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace testService.Models
{
    public class Test
    {
        public int Id { get; set; }
        public User user { get; set; }
        public int TestId { get; set; }
        public int Fail { get; set; }
        public int Correct { get; set; }
        public int Neutral { get; set; }
        public int Try { get; set; }
        public string Result { get; set; }
        public DateTime Timestamp { get; set; }
        public int TimeSpend { get; set; }
        public int IsDone { get; set; }
    }
}