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
    public class KhachHangController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;

        public KhachHangController(NhatNgheWebAPIContext ctx)
        {
            _context = ctx;
        }

        [HttpPost]
        public IActionResult Login(LoginVM model)
        {
            var khachHang = _context.KhachHang.SingleOrDefault(kh => kh.MaKh == model.Username && kh.MatKhau == model.Password);

            if(khachHang == null)
            {
                return Ok(new ApiResponseModel
                {
                    Success = false,
                    Message = "Sai thông tin đăng nhập"
                });
            }

            return Ok(new ApiResponseModel
            {
                Success = true,
                Message = "Đăng nhập thành công"
            });
        }
    }
}