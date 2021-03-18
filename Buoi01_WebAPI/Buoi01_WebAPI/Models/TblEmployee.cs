using System;
using System.Collections.Generic;

namespace Buoi01_WebAPI.Models
{
    public partial class TblEmployee
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string City { get; set; }
        public string Department { get; set; }
        public string Gender { get; set; }
    }
}
