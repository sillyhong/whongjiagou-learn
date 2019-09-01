import React, { Component } from 'react';
export default class TodoInput extends Component {
    handleKeyDown = (event) => {
        let code = event.keyCode;
        if (code == 13) {
            let text = event.target.value;
            this.props.addTodo(text);
            event.target.value = '';
        }
    }
    addTodo = () => {
        let text = this.todo.value;
        this.props.addTodo(text);
        this.todo.value = '';
    }
    render() {
        return (
            <div>
                <input ref={input => this.todo = input} onKeyDown={this.handleKeyDown} />
                <input id="addBtn" onClick={this.addTodo} defaultValue="增加" />
            </div>
        )
    }
}