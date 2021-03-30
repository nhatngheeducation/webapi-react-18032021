import './App.css';
import { Demo, Hello } from './components/Demo';
import { useState } from 'react';

function App() {
    const [hoTen, setHoTen] = useState('Nhất Nghệ');
    const handleChange = (value) => {
        console.log(value)
        setHoTen(value)
    }

    //Khai báo state chứa danh sách các việc cần làm
    const [items, setItems] = useState([
        "Đi học ReactJS", "Xem phim", "Nghe nhạc"
    ]);
    const [value, setValue] = useState("");
    const handleAddItem = () => {
        //lấy giá trị của value thêm bào mảng Items
        //let newValue = [...items, value]
        let newValue = [value, ...items]
        setItems(newValue);
    }

    return (
        <div className="App">
            <h2>Danh sách công việc</h2>
            {items.map(item => (
                <div className="todo-item">{item}</div>
            ))}
            {items.map(item => {
                let item_kq = item.toUpperCase();
                return (
                    <li>{item_kq}</li>
                );
            })}
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
