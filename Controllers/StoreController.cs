using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MVPOnBoardAPI.Models;

namespace MVPOnBoardAPI.Controllers
{
    [ApiController]
    public class StoreController : ControllerBase
    {
        [Route("api/[controller]")]
        public IEnumerable<Stores> Index()
        {
            var tempList = StoreDAL.GetAllStores();
            return tempList;
        }

        [Route("api/[controller]/Edit/{id}")]
        public Stores Edit(int id)
        {
            return StoreDAL.GetStoreFromId(id);
        }

        [Route("api/[controller]/Delete/{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            StoreDAL.DeleteStoreInfoFromId(id);
        }

        [Route("api/[controller]/Update/")]
        [HttpPost]
        public void Update(Stores store)
        {
            StoreDAL.UpdateStoreInfoFromId(store);
        }

        [Route("api/[controller]/Create/")]
        [HttpPost]
        public void Create(Stores store)
        {
            StoreDAL.CreateStoreInfo(store);
        }
    }
}