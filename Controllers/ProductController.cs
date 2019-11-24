using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using MVPOnBoardAPI.Models;

namespace MVPOnBoardAPI.Controllers
{
    [ApiController]
    public class ProductController : ControllerBase
    {
        [Route("api/[controller]")]
        public IEnumerable<Products> Index()
        {
            var tempList = ProductDAL.GetAllProducts();
            return tempList;
        }

        [Route("api/[controller]/Edit/{id}")]
        public Products Edit(int id)
        {
            return ProductDAL.GetProductFromId(id);
        }

        [Route("api/[controller]/Delete/{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            ProductDAL.DeleteProductInfoFromId(id);
        }

        [Route("api/[controller]/Update/")]
        [HttpPost]
        public void Update(Products product)
        {
            ProductDAL.UpdateProductInfoFromId(product);
        }

        [Route("api/[controller]/Create/")]
        [HttpPost]
        public void Create(Products product)
        {
            ProductDAL.CreateProductInfo(product);
        }
    }
}