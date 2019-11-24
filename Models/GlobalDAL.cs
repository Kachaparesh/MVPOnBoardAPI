using Microsoft.EntityFrameworkCore;
using MVPOnBoardAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace MVPOnBoardAPI.Controllers
{
    public static class GlobalDAL
    {
        //this method will get all the student record

        public static Global GetFullRecordObject()
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                var globalRecords = new Global();
                var sale = db.Sales;
                var salesCust = sale.Include(record => record.Customer).AsNoTracking();
                var salesProd = salesCust.Include(record => record.Product);
                var salesStore = salesProd.Include(record => record.Store);
                globalRecords.Sale = salesStore.ToArray();

                var customer = db.Customers;
                var customerSale = customer.Include(record => record.Sales).ToArray();
                globalRecords.Customer = customerSale;

                var product = db.Products;
                var productSale = product.Include(record => record.Sales).ToArray();
                globalRecords.Product = productSale;

                var store = db.Stores;
                var storeSale = store.Include(record => record.Sales).ToArray();
                globalRecords.Store = storeSale;

                return globalRecords;// or some other simple query
            }
        }
    }
}
