using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Buoi02_WebAPI.Models;
using Buoi02_WebAPI.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Buoi02_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly NhatNgheWebAPIContext _context;
        private readonly byte[] _KeyBytes;

        public KhachHangController(NhatNgheWebAPIContext ctx, IConfiguration configuration)
        {
            _context = ctx;
            var secretKey = configuration["AppSettings:SecretKey"];
            _KeyBytes = Encoding.UTF8.GetBytes(secretKey);
        }

        [HttpPost("/api/authen/login")]
        public IActionResult Login(LoginVM model)
        {
            var khachHang = _context.KhachHang
                .Include(kh => kh.PhanCong)
                .SingleOrDefault(kh => kh.MaKh == model.Username && kh.MatKhau == model.Password);

            if(khachHang == null)
            {
                return Ok(new ApiResponseModel
                {
                    Success = false,
                    Message = "Sai thông tin đăng nhập"
                });
            }

            //thông tin đặc trưng của user
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.Name, khachHang.HoTen),
                new Claim(ClaimTypes.Email, khachHang.Email),
                new Claim("CustomerID", khachHang.MaKh)                
            };

            //Add quyền cho token
            foreach(var item in khachHang.PhanCong)
            {
                claims.Add(new Claim(ClaimTypes.Role, item.MaVt));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_KeyBytes), SecurityAlgorithms.HmacSha512)
            };
            var token = tokenHandler.CreateToken(tokenDesc);

            return Ok(new ApiResponseModel
            {
                Success = true,
                Message = "Đăng nhập thành công",
                Data = tokenHandler.WriteToken(token)
            });
        }
    }
}