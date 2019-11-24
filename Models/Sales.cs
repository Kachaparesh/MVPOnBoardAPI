using System;
using System.Collections.Generic;

namespace MVPOnBoardAPI.Models
{
    public partial class Sales
    {
        public int SaleId { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Products Product { get; set; }
        public virtual Stores Store { get; set; }
    }
}
