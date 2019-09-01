import React, { Component } from 'react';
import TodoItem from './TodoItem';
export default class TodoList extends Component {
    render() {
        return (
            <ul>
                {
                    this.props.todos.map(todo => <TodoItem
                        key={todo.id}
                        todo={todo}
                        delTodo={this.props.delTodo}
                        toggleTodo={this.props.toggleTodo} />)
                }
            </ul>
        )
    }
}