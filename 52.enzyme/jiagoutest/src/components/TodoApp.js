import React, { Component } from 'react';
import PorpTypes from 'prop-types';
import './TodoApp.css'
import actions from '../store/actions';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { connect } from 'react-redux';
class TodoApp extends Component {
    // static propTypes = {
    //     title: PorpTypes.string.isRequired
    // }
    render() {
        return (
            <div>
                <h3 className="title">珠峰待办事项</h3>
                <TodoInput addTodo={this.props.addTodo} />
                <TodoList
                    delTodo={this.props.delTodo}
                    todos={this.props.todos}
                    toggleTodo={this.props.toggleTodo} />
            </div>
        )
    }
}
export default connect(
    state => ({ todos: state }),
    actions
)(TodoApp);