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
    const [pageSize, setPageSize] = useState(25);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value));
    }

    const layDuLieu = () => {
        const getData = {
            search: keyword,
            page,
            size: pageSize
        };
        axios.get(hangHoaApi, { params: getData })
            .then(response => {
                setIsLoading(false);
                setDataHangHoa(response.data.data);
                setTotalPage(response.data.totalPage);
            })
            .catch(err => {
                console.log(`Lỗi ${err}`);
            });
    }
    useEffect(() => {
        layDuLieu();
    }, []);
    useEffect(() => {
        layDuLieu();
    }, [pageSize, page]);
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
            <div>
                Page: {page}/{totalPage}.
                Size:
                <select onChange={handlePageSizeChange}>
                    <option value="10">10</option>
                    <option value="25" selected>25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
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

