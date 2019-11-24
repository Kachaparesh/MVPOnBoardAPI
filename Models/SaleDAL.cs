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
    public static class SaleDAL
    {
        //this method will get all the student record

        public static IEnumerable<Sales> GetAllSales()
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                var sale = db.Sales;
                var salesCust = sale.Include(record => record.Customer).AsNoTracking();
                var salesProd = salesCust.Include(record => record.Product);
                var salesStore = salesProd.Include(record => record.Store);
                var finalResult = salesStore.ToArray();
                return finalResult;// or some other simple query
            }
        }

        public static Sales GetSaleFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                return db.Sales.Find(id);
            }
        }

        public static void UpdateSaleInfoFromId(Sales sale)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Entry(sale).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public static void CreateSaleInfo(Sales sale)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Sales.Add(sale);
                db.SaveChanges();
            }
        }

        public static void DeleteSaleInfoFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Sales.Remove(SaleDAL.GetSaleFromId(id));
                db.SaveChanges();
            }
        }
    }
}
