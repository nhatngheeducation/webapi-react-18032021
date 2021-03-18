using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Buoi01_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Buoi01_WebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet]
        [Route("cities")]
        public IActionResult GetAllCities()
        {
            try
            {
                var db = new APICoreReactContext();
                List<TblCities> danhSachThanhPho = db.TblCities.ToList();

                return Ok(danhSachThanhPho);
            }
            catch
            {
                return this.NotFound();
            }
        }

        [HttpGet]
        [Route("querycities")]
        public IActionResult GetAllCities(string query)
        {
            try
            {
                var db = new APICoreReactContext();
                List<TblCities> danhSachThanhPho = db.TblCities
                    .Where(tp => tp.CityName.Contains(query))
                    .ToList();

                return Ok(danhSachThanhPho);
            }
            catch
            {
                //return Content("Sai rồi");
                var json = new
                {
                    success=  false,
                    message = "Lỗi"
                };
                return Ok(json);
                //return File();
            }
        }

        [HttpGet]
        [Route("ThemThanhPho")]
        public IActionResult ThemThanhPho()
        {
            try
            {
                var guid = Guid.NewGuid();
                var thanhPho = new TblCities
                {
                    CityName = "Kiên Giang"
                };
                var db = new APICoreReactContext();
                db.Add(thanhPho);
                db.SaveChanges();
                return Ok(thanhPho);
            }
            catch
            {
                return this.BadRequest();
            }
        }
    }
}
