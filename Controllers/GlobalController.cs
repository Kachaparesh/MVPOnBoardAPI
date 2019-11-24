using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MVPOnBoardAPI.Models;

namespace MVPOnBoardAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class GlobalController : ControllerBase
    {
        [HttpGet]
        public Global Index()
        {
            var globalData = GlobalDAL.GetFullRecordObject();
            return globalData;
        }
    }
}