import './App.css';
import { Demo, Hello } from './components/Demo';
import { useState } from 'react';
import {
    BrowserRouter as Router,
    Route, Link, Switch
} from 'react-router-dom';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { TodoList } from './components/TodoList';
import { TodoApp } from './components/todo/TodoApp';

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
                    </ul>
                </div>

                { /* Khai báo định tuyến*/}
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/todos">
                        <TodoList />
                        <TodoApp />
                    </Route>
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
            <Demo name={hoTen} />
            <Hello name={hoTen} />
        </div >
    );
}

export default App;
