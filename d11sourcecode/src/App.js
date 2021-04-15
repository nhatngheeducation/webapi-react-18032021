﻿import './App.css';
import { Demo, Hello } from './components/Demo';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route, Link, Switch
} from 'react-router-dom';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { TodoList } from './components/TodoList';
import { DemoHook } from './components/DemoHook';
import { Loai } from './components/loai/Loai';
import { ThemHangHoa } from './components/hanghoa/ThemHangHoa';
import { DanhSachHangHoa } from './components/hanghoa/DanhSachHangHoa';
import { UploadFile } from './components/UploadFile';
import { Login } from './components/Login';
import { useSelector } from 'react-redux';

function App() {
    const isLoggedIn = useSelector(state => state.User.isLoggedIn);
    const fullName = useSelector(state => state.User.fullName);
    
    const [hoTen, setHoTen] = useState('Nhất Nghệ');
    const handleChange = (value) => {
        console.log(value)
        setHoTen(value)
    }

    //Khai báo state chứa danh sách các việc cần làm
    const [items, setItems] = useState([
        { "text": "Đi học ReactJS", "done": false },
        { "text": "Xem phim", "done": true },
        { "text": "Nghe nhạc", "done": false }
    ]);
    const [value, setValue] = useState("");
    const handleAddItem = () => {
        //lấy giá trị của value thêm bào mảng Items
        let newValue = [{ "text": value, "done": false }, ...items]
        setItems(newValue);
    }
    const handleComplete = (index) => {
        console.log(index, items)
        let newValue = items;
        newValue[index].done = true;
        setItems(newValue);
        console.log("After", items)
    }
    return (
        <div className="App">
            <Router>
                { /* Menu */}
                <div>
                    <ul>
                        <li className="menu-item">
                            <Link to="/" style={{ textDecoration: 'none' }}>Trang chủ</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/contact">Danh bạ</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/todos">QL Công việc</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/admin/loai">QL Loại</Link>
                        </li>
                        <li className="menu-item">
                            <Link to="/admin/hanghoa/danhsach">Hàng hóa</Link>
                        </li>
                        {isLoggedIn ? (
                            <span>Xin chào {fullName}</span>
                        ) : (
                            <li className="menu-item">
                                <Link to="/login">Đăng nhập</Link>
                            </li>
                        )}
                        
                    </ul>
                </div>
                <hr />
                { /* Khai báo định tuyến*/}
                <div style={{ minHeight: 500, padding: 5 }}>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/upload" component={UploadFile} />
                        <Route path="/admin/hanghoa/them" component={ThemHangHoa} />
                        <Route path="/admin/hanghoa/danhsach" component={DanhSachHangHoa} />
                        <Route path="/admin/loai" component={Loai} />
                        <Route path="/demohook" component={DemoHook} />
                        <Route path="/about" component={About} />
                        <Route path="/todos" component={TodoList} />
                        <Route path="/contact">
                            <Contact />
                            <About />
                        </Route>
                        <Route path="/">
                            <h2>TRANG CHỦ</h2>
                        </Route>
                    </Switch>
                </div>
            </Router>


            <hr />
            <Demo name={hoTen} />
            <Hello name={hoTen} />
        </div>
    );
}

export default App;
