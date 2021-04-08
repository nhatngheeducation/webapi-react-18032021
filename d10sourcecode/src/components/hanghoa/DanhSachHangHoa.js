// src/components/hanghoa/DanhSachHangHoa.js
import '../assests/hanghoa.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const HangHoa = (props) => {
    const { data } = props;
    return (
        <div class="hanghoa">
            {data.tenHh}
            <img src={data.hinh} />
            <div>{data.giaBan}</div>
        </div>
    )
}

export const DanhSachHangHoa = () => {
    const [dataHangHoa, setDataHangHoa] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hangHoaApi = 'https://localhost:44325/api/hanghoa';

    useEffect(() => {
        axios.get(hangHoaApi)
            .then(response => {
                setIsLoading(false);
                setDataHangHoa(response.data);
            })
            .catch(err => {
                console.log(`Lỗi ${err}`);
            });
    }, []);

    return (
        <div>
            <h2>Danh sách Hàng hóa</h2>
            {isLoading ? (
                <h3><i>Đang tải dữ liệu</i></h3>
            ) : (
                    <div id="products-container">
                        {dataHangHoa.map(hh => (
                            <HangHoa data={hh} />
                        ))}
                    </div>

                )}
        </div>
    )
}