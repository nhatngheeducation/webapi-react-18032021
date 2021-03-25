using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buoi02_WebAPI.ViewModels
{
    public class DonHang
    {
        public string MaKh { get; set; }
        public string NguoiNhan { get; set; }
        public string DiaChiGiao { get; set; }
        public List<DonHangChiTiet> HangHoa { get; set; }
        public DonHang()
        {
            HangHoa = new List<DonHangChiTiet>();
        }
    }

    public class DonHangChiTiet
    {
        public int MaHH { get; set; }
        public int SoLuong { get; set; }
    }
}
