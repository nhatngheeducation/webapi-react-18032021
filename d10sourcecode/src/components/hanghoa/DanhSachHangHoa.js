// src/components/hanghoa/DanhSachHangHoa.js
import '../assests/hanghoa.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const HangHoa = (props) => {
    const { data } = props;
    return (
        <div class="hanghoa">
            <div className="hh-ten">{data.tenHh}</div>
            <img className="hh-hinh" src={data.hinh} />
            <div className="hh-gia">{data.giaBan} $</div>
            <button className="hh-mua">Mua</button>
        </div>
    )
}

export const DanhSachHangHoa = () => {
    const [dataHangHoa, setDataHangHoa] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hangHoaApi = 'https://localhost:44325/api/hanghoa';
    const [keyword, setKeyword] = useState('');

    const layDuLieu = () => {
        axios.get(hangHoaApi + "?search=" + keyword)
            .then(response => {
                setIsLoading(false);
                setDataHangHoa(response.data);
            })
            .catch(err => {
                console.log(`Lỗi ${err}`);
            });
    }
    useEffect(() => {
        layDuLieu();
    }, []);
    const handleSearch = (e) => {
        setIsLoading(true);
        layDuLieu();
    }
    return (
        <div>
            <h2>Danh sách Hàng hóa</h2>
            <div>
                Tìm kiếm
                <input placeholder="Nhập từ khóa"
                    onChange={(e) => setKeyword(e.target.value)} />
                <button onClick={handleSearch}>Tìm</button>
            </div>
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