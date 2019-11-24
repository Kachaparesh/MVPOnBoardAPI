using Microsoft.EntityFrameworkCore;
using MVPOnBoardAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace MVPOnBoardAPI.Controllers
{
    public static class ProductDAL
    {
        //this method will get all the student record
        public static IEnumerable<Products> GetAllProducts()
        {
            
            using (var db = new MVPOnBoardAPIContext())
            {
                var product = db.Products;
                var productSale = product.Include(record => record.Sales).ToArray();
                return productSale;
            }
        }

        public static Products GetProductFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                return db.Products.Find(id);
            }
        }

        public static void UpdateProductInfoFromId(Products prod)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Entry(prod).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public static void CreateProductInfo(Products prod)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Products.Add(prod);
                db.SaveChanges();
            }
        }

        public static void DeleteProductInfoFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Products.Remove(ProductDAL.GetProductFromId(id));
                db.SaveChanges();
            }
        }
    }
}
