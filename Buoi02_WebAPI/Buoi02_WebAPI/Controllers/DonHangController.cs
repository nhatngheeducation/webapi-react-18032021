using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;

        public DonHangController(NhatNgheWebAPIContext ctx)
        {
            _context = ctx;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(DonHang donHang)
        {
            //var orderId = Guid.NewGuid();            
            var hoaDon = new HoaDon
            {
                MaKh = donHang.MaKh,
                HoTen = donHang.NguoiNhan,
                DiaChi = donHang.DiaChiGiao,
                NgayDat = DateTime.UtcNow,
                NgayCan = DateTime.UtcNow.AddDays(2),
                NgayGiao = DateTime.UtcNow.AddDays(2),
                CachThanhToan = "Tiền mặt",
                CachVanChuyen = "Đường bộ",
                PhiVanChuyen = 0,
                TrangThai = 0//mới đặt
            };

            var trans = _context.Database.BeginTransaction();
            try
            {
                _context.Add(donHang);
                _context.SaveChanges();

                // tạo chi tiết hóa đơn
                foreach (var chitiet in donHang.HangHoa)
                {
                    var hangHoa = _context.HangHoa.SingleOrDefault(hh => hh.MaHh == chitiet.MaHH);
                    if (hangHoa != null)
                    {
                        _context.Add(new ChiTietHd { 
                            MaHd = hoaDon.MaHd,
                            MaHh = hangHoa.MaHh,
                            SoLuong = chitiet.SoLuong,
                            DonGia = hangHoa.DonGia.Value,
                            GiamGia = hangHoa.GiamGia
                        });
                    }
                }
                _context.SaveChanges();

                trans.Commit();
                return Ok(new ApiResponseModel
                {
                    Success = true,
                    Data = hoaDon.MaHd
                });
            }
            catch
            {
                trans.Rollback();
                return Ok(new ApiResponseModel { 
                    Success = false,
                    Message = "Tạo mới hóa đơn không thành công"
                });
            }
        }
    }
}