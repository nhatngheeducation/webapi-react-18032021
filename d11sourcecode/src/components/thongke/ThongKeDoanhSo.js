import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

export const ThongKeDoanhSo = () => {
    const [loai, setLoai] = useState([]);
    const [doanhSoTheoLoai, setDoanhSoTheoLoai] = useState([]);

    const layThongKeTheoLoai = () => {
        axios.get("https://localhost:44325/api/ThongKe/loai")
            .then(res => {
                if (res.status === 200) {
                    const data_response = res.data;
                    const dataLoai = [];
                    const dataDoanhSo = [];
                    for (let item in data_response) {
                        dataLoai.push(data_response[item].tenLoai);
                        dataDoanhSo.push(data_response[item].doanhThu);
                    }
                    setLoai(dataLoai);
                    setDoanhSoTheoLoai(dataDoanhSo);
                } else {
                    alert('Lỗi');
                }
            });
    }
    useEffect(() => {
        layThongKeTheoLoai()
    }, []);

    const data = {
        labels: loai,
        datasets: [
            {
                label: '# of Votes',
                data: doanhSoTheoLoai,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>THỐNG KÊ DOANH SỐ BÁN HÀNG</h2>
            <Pie data={data} />
        </div>
    );
}