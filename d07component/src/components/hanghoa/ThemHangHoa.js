// src/components/hanghoa/ThemHangHoa.js
import axios from 'axios';
import { useState } from "react"

export const ThemHangHoa = () => {
    const [errMessage, setErrorMessage] = useState('');
    const [uploadMessage, setUploadMessage] = useState('');
    const [myFile, setMyFile] = useState({});
    const uploadFileEndpoint = "https://localhost:44325/api/HangHoa/upload";

    const handleUploadFile = (e) => {
        //    setUploadMessage('');
        //    //1. Tạo object FormData
        //    const formData = new FormData();
        //    formData.append("myFile", myFile);

        //    //2. call api
        //    axios.post(uploadFileEndpoint, formData)
        //        .then((response) => {
        //            console.log(response);
        //            setUploadMessage("Upload file thành công")
        //            setMyFile({});
        //        })
        //        .catch((error) => {
        //            setUploadMessage(`Có lỗi: ${error}`)
        //        });
    }

    const checkFileExtension = (e) => {
        //    setErrorMessage('');
        //    //check file type
        //    const fileTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];

        //    let file = e.target.files;
        //    if (fileTypes.every(extension => file[0].type != extension)) {
        //        setErrorMessage(`Không support loại file ${file[0].type} này.`);
        //    } else {
        //        setMyFile(file[0]);
        //    }
    }

    return (
        <div>
            <h2>THÊM HÀNG HÓA</h2>
            <table style={{ margin: '0 auto', textAlign: "justify" }}>
                <tr>
                    <td>Tên hàng hóa</td>
                    <td>
                        <input />
                    </td>
                </tr>
                <tr>
                    <td>Nhà cung cấp</td>
                    <td>
                        <input placeholder="NK/SS/AP/MO/SM" />
                    </td>
                </tr>
                <tr>
                    <td>Đơn giá</td>
                    <td>
                        <input type="number" />
                    </td>
                </tr>
                <tr>
                    <td>Ngày sản xuất</td>
                    <td>
                        <input type="date" />
                    </td>
                </tr>
                <tr>
                    <td>Loại</td>
                    <td>
                        <select>
                            <option>--None---</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Hình</td>
                    <td>
                        <input type="file" onChange={checkFileExtension} />
                        <span>{errMessage}</span>
                    </td>
                </tr>
            </table>
            <button onClick={handleUploadFile}>Thêm mới</button>
            <div>{uploadMessage}</div>
        </div>
    );
}