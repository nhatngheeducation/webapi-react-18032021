import './ToDo.css';
import { useState } from 'react';

export function TodoList() {
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
        <div>
            <h2>Danh sách công việc</h2>
            <div className="todo">
                {/* {items.map((item, idx) => (
                    <Todo key={idx} index={idx} todo={item} handleComplete={handleComplete(idx)} />
                ))} */}
            </div>
            <div>
                Nhập công việc:
                <input value={value} onChange={e => setValue(e.target.value)} />
                <button onClick={handleAddItem}>Thêm</button>
            </div>
        </div>
    );
}

const Todo = ({ todo, handleComplete }) => {
    return (
        <div className="todo">
            {todo.text}
            {todo.done === false ? (
                <button className="btn-complete"
                    onClick={() => handleComplete(todo.idx)}>
                    Hoàn thành</button>
            ) : ''}
        </div>
    );
};