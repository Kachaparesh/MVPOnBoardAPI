using Microsoft.EntityFrameworkCore;
using MVPOnBoardAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace MVPOnBoardAPI.Controllers
{
    public static class CustomerDAL
    {
        //this method will get all the student record
        public static IEnumerable<Customers> GetAllCustomers()
        {
            
            using (var db = new MVPOnBoardAPIContext())
            {
                var customer = db.Customers;
                var customerSale = customer.Include(record => record.Sales).ToArray();
                return customerSale;
            }
        }

        public static Customers GetCustomerFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                return db.Customers.Find(id);
            }
        }

        public static void UpdateCustomerInfoFromId(Customers cust)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Entry(cust).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public static void CreateCustomerInfo(Customers cust)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Customers.Add(cust);
                db.SaveChanges();
            }
        }

        public static void DeleteCustomerInfoFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                //var getSales = db.Sales.Where(record => record.CustomerId == id).ToArray();

                //foreach (var item in getSales)
                //{
                //    item.CustomerId = 0;
                //}
                //db.SaveChanges();
                _ = db.Customers.Remove(CustomerDAL.GetCustomerFromId(id));
                db.SaveChanges();
            }
        }
    }
}
