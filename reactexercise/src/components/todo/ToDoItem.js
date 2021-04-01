import React from "react";
import '../ToDo.css';

const ToDoItem = (props) => {
    const { name, done } = props.todo;
    return (
        <div className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
            {name}
            {!done ? <button onClick={props.completed}>Completed</button> : ""}
            <button onClick={props.remove}>Remove</button>
        </div>
    );
}

export default ToDoItem;