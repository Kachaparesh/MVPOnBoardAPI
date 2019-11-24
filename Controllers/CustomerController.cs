using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MVPOnBoardAPI.Models;

namespace MVPOnBoardAPI.Controllers
{
    [ApiController]
    public class CustomerController : ControllerBase
    {

        [Route("api/[controller]")]
        public IEnumerable<Customers> Index()
        {
            var tempList = CustomerDAL.GetAllCustomers();
            return tempList;
        }

        [Route("api/[controller]/Edit/{id}")]
        public Customers Edit(int id)
        {
            return CustomerDAL.GetCustomerFromId(id);
        }

        [Route("api/[controller]/Delete/{id}")]
        [HttpDelete]
        public void Delete(int id)
        {
            CustomerDAL.DeleteCustomerInfoFromId(id);
        }

        [Route("api/[controller]/Update/")]
        [HttpPost]
        public void Update(Customers customer)
        {
            CustomerDAL.UpdateCustomerInfoFromId(customer);
        }

        [Route("api/[controller]/Create/")]
        [HttpPost]
        public void Create(Customers customer)
        {
            CustomerDAL.CreateCustomerInfo(customer);
        }
    }
}