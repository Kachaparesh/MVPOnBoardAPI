using System;
using System.Collections.Generic;

namespace MVPOnBoardAPI.Models
{
    public partial class Global
    {
        public ICollection<Sales> Sale { get; set; }
        public ICollection<Customers> Customer { get; set; }
        public ICollection<Products> Product { get; set; }
        public ICollection<Stores> Store { get; set; }
    }
}
