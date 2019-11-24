using System;
using System.Collections.Generic;

namespace MVPOnBoardAPI.Models
{
    public partial class Products
    {
        public Products()
        {
            Sales = new HashSet<Sales>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public double ProductPrice { get; set; }

        public virtual ICollection<Sales> Sales { get; }
    }
}
