// src/components/hanghoa/DanhSachHangHoa.js
import '../assests/hanghoa.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { actionAddToCart } from '../../actions/index';
import { useDispatch } from 'react-redux';

export const HangHoa = (props) => {
    const dispatch = useDispatch();
    const { data } = props;
    const [qty, setQuantity] = useState(1);
    return (
        <div class="hanghoa">
            <div className="hh-ten">{data.tenHh}</div>
            <img className="hh-hinh" src={data.hinh} />
            <div className="hh-gia">{data.giaBan} $</div>
            <input style={{ width: '35px' }} defaultValue="1" type="number" min="1"
                onChange={(e) => setQuantity(parseInt(e.target.value))} />
            <button className="hh-mua"
                onClick={() =>
                    dispatch(actionAddToCart(data, qty))
                }
            >Mua</button>
        </div>
    )
}

export const DanhSachHangHoa = () => {
    const [dataHangHoa, setDataHangHoa] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const hangHoaApi = 'https://localhost:44325/api/hanghoa';
    const [keyword, setKeyword] = useState('');

    const layDuLieu = () => {
        const getData = {
            search: keyword,
            page: 2,
            size: 20
        };
        //axios.get(hangHoaApi + "?search=" + keyword)
        axios.get(hangHoaApi, getData)
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

