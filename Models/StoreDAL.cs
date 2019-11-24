using Microsoft.EntityFrameworkCore;
using MVPOnBoardAPI.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace MVPOnBoardAPI.Controllers
{
    public static class StoreDAL
    {
        //this method will get all the student record
        public static IEnumerable<Stores> GetAllStores()
        {
            
            using (var db = new MVPOnBoardAPIContext())
            {
                var store = db.Stores;
                var storeSale = store.Include(record => record.Sales).ToArray();
                return storeSale;
                //return db.Stores.ToArray(); // or some other simple query
            }
        }

        public static Stores GetStoreFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                return db.Stores.Find(id);
            }
        }

        public static void UpdateStoreInfoFromId(Stores store)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Entry(store).State = EntityState.Modified;
                db.SaveChanges();
            }
        }

        public static void CreateStoreInfo(Stores store)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Stores.Add(store);
                db.SaveChanges();
            }
        }

        public static void DeleteStoreInfoFromId(int id)
        {
            using (var db = new MVPOnBoardAPIContext())
            {
                db.Stores.Remove(StoreDAL.GetStoreFromId(id));
                db.SaveChanges();
            }
        }
    }
}
