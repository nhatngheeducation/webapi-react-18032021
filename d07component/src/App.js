import './App.css';
import { Demo, Hello } from './components/Demo';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route, Link, Switch
} from 'react-router-dom';
import { About } from './components/About';
import { Contact } from './components/Contact';

function App() {
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
                        <li>
                            <Link to="/" style={{ textDecoration: 'none' }}>Trang chủ</Link>
                        </li>
                        <li>
                            <Link to="/about">Giới thiệu</Link>
                        </li>
                        <li>
                            <Link to="/contact">Danh bạ</Link>
                        </li>
                    </ul>
                </div>

                { /* Khai báo định tuyến*/}
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/contact">
                        <Contact />
                        <About />
                    </Route>
                    <Route path="/">
                        <h2>TRANG CHỦ</h2>
                    </Route>

                </Switch>
            </Router>


            <hr />
            <h2>Danh sách công việc</h2>
            {items.map((item, idx) => (
                <div className="todo-item" key={idx} >
                    {item.text}
                    {item.done == false ? (
                        <button className="btn-complete"
                            onClick={() => handleComplete(idx)}>
                            Hoàn thành</button>
                    ) : ''}
                </div>
            ))}
            {/* {items.map(item => {
                let item_kq = item.text.toUpperCase();
                return (
                    <li>{item_kq}</li>
                );
            })} */}
            <div>
                Nhập công việc:
                <input value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={handleAddItem}>Thêm</button>
            </div>
            <div>
                Nhập tên:
                <input onChange={e => handleChange(e.target.value)} />
            </div>
            <Demo name={hoTen} />
            <Hello name={hoTen} />
        </div>
    );
}

export default App;
