//src/components/loai/Loai.js

import { useState, useEffect } from "react";

export const Loai = () => {
    const [dataLoai, setDataLoai] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [loaiObj, setLoaiObj] = useState({});
    const apiUrl = "https://localhost:44325/api/loai";
    const getLoai = () => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setDataLoai(data);
            });
    }

    useEffect(() => {
        let myInterval = setInterval(() => { getLoai() }, 10000);

        return () => clearInterval(myInterval);
        
    }, []);

    const getLoaiById = (id, item) => {
        setIsEdit(true);
        setLoaiObj(item);
    }

    const updateLoaiObj = (key, value) => {
        let newObj = loaiObj;
        newObj[key] = value;
        console.log(newObj);
        setLoaiObj(newObj);
    }

    return (
        <div>
            <h2>Quản lý Loại</h2>
            {dataLoai.length == 0 ? (
                <h3>No data</h3>
            ) : (
                    dataLoai.map((item, index) => (
                        <div>
                            {item.tenLoai} - {item.maLoai}
                            <button onClick={() => getLoaiById(item.maLoai, item)}>Sửa</button>
                        </div>
                    )
                    )
                )}

            {isEdit && (
                <div>
                    <h4>SỬA THÔNG TIN</h4>
                    <form>
                        Mã loại: <input value={loaiObj.maLoai} readOnly /><br />
                    Tên loại: <input defaultValue={loaiObj.tenLoai} onChange={(e) => updateLoaiObj("tenLoai", e.target.value)} /><br />
                    Hình: <input defaultValue={loaiObj.hinh} onChange={(e) => updateLoaiObj("hinh", e.target.value)} /><br />
                    Mô tả: <textarea onChange={(e) => console.log(e)}>{loaiObj.moTa}</textarea><br />
                        <button>Cập nhật</button>
                    </form>
                </div>
            )}

        </div>
    );
}