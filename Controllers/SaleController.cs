using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MVPOnBoardAPI.Models;

namespace MVPOnBoardAPI.Controllers
{
    [ApiController]
    public class SaleController : ControllerBase
    {
        [Route("api/[controller]")]
        public IEnumerable<Sales> Index()
        {
            var tempList = SaleDAL.GetAllSales();
            return tempList;
        }

        [Route("api/[controller]/Edit/{id}")]
        public Sales Edit(int id)
        {
            return SaleDAL.GetSaleFromId(id);
        }

        [Route("api/[controller]/Delete/{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            SaleDAL.DeleteSaleInfoFromId(id);
        }

        [Route("api/[controller]/Update/")]
        [HttpPost]
        public void Update(Sales sale)
        {
            SaleDAL.UpdateSaleInfoFromId(sale);
        }

        [Route("api/[controller]/Create/")]
        [HttpPost]
        public void Create(Sales sale)
        {
            SaleDAL.CreateSaleInfo(sale);
        }
    }
}