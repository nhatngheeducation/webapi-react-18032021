import React from "react";

export default function TodoForm(props) {
    return (
        <form onSubmit={props.onSubmit} style={{ paddingLeft: 40, marginTop: 16 }}>
            <input
                type="text"
                value={props.value}
                onChange={props.onChange}
                placeholder="Ví dụ: Học ReactJS 18:00"
            />
            <button type="submit">Thêm</button>
        </form>
    );
}
