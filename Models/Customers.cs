using System;
using System.Collections.Generic;

namespace MVPOnBoardAPI.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Sales = new HashSet<Sales>();
        }

        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }

        public  virtual ICollection<Sales> Sales { get; }
    }
}
