using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HangHoaController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;
        private readonly int SO_PHAN_TU_MOI_TRANG;

        public HangHoaController(NhatNgheWebAPIContext ctx, IConfiguration config)
        {
            _context = ctx;
            SO_PHAN_TU_MOI_TRANG = int.Parse(config["PagingConfig:NumberOfRecord"]);
        }

        [HttpGet]
        // host/api/HangHoa?search=xyz&page=1
        public IActionResult GetAll(string search, int page = 1)
        {
            //HttpContext.Request
            var hangHoa = _context.HangHoa.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                hangHoa = hangHoa.Where(hh => hh.TenHh.Contains(search));
            }

            var data = hangHoa.Skip((page - 1) * SO_PHAN_TU_MOI_TRANG)
                .Take(SO_PHAN_TU_MOI_TRANG)
                .Select(hh => new HangHoaVM
                {
                    MaHh = hh.MaHh,
                    TenHh = hh.TenHh,
                    GiaBan = hh.DonGia,
                    Hinh = MyTools.GetRealUrl("HangHoa", hh.Hinh, HttpContext.Request)
                }).ToList();
            return Ok(data);
        }

    }
}