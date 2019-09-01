import React, { Component } from 'react';
import './TodoItem.css'
//props.todo={id:1,text:1,completed:false}
export default class TodoItem extends Component {
    render() {
        let { id, text, completed } = this.props.todo;
        return (
            <li>
                <span
                    onClick={() => this.props.toggleTodo(id)}
                    className={completed ? 'todo-completed' : 'todo'}
                >{text}</span>
                <button onClick={() => this.props.delTodo(id)}>x</button>
            </li>
        )
    }
}