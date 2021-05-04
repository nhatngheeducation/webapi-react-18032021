using Buoi02_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKeController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;

        public ThongKeController(NhatNgheWebAPIContext ctx)
        {
            _context = ctx;
        }

        [HttpGet("loai")]
        public IActionResult ThongKeTheoLoai(DateTime? TuNgay, DateTime? DenNgay)
        {
            var queryData = _context.ChiTietHd.AsQueryable();
            if (TuNgay.HasValue)
            {
                queryData = queryData.Where(ct => ct.MaHdNavigation.NgayDat >= TuNgay);
            }
            if (DenNgay.HasValue)
            {
                queryData = queryData.Where(ct => ct.MaHdNavigation.NgayDat <= DenNgay);
            }
            var data = queryData.GroupBy(cthd => new
            {
                cthd.MaHhNavigation.MaLoai,
                cthd.MaHhNavigation.MaLoaiNavigation.TenLoai
            })
                .Select(g => new
                {
                    g.Key.MaLoai,
                    g.Key.TenLoai,
                    DoanhThu = g.Sum(cthd => cthd.SoLuong * cthd.DonGia * (1 - cthd.GiamGia)),
                    GiaTrungBinh = g.Average(cthd => cthd.DonGia)
                });
            return Ok(data);
        }

    }
}