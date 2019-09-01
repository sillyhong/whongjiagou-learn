import React, { Component } from 'react';
import { fromJS, Map, List, is } from 'immutable';
class PureComponent extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return !(is(newProps, this.props) && is(nextState, this.state));
        //循环下一个新的属性对象的每一个属性，判断新的属性值和旧的属性是不是同一个
        //重点强调 ，这个比较属性属于浅比较
        // 如果把这里改为深比较，那么CPU占用高
        // for (let prop in nextProps) {
        //     if (nextProps[prop] !== this.props[prop]) {
        //         return true;
        //     }
        // }
        // for (let prop in nextState) {
        //     if (nextState[prop] !== this.state[prop]) {
        //         return true;
        //     }
        // }
        // return false;
    }
}
export default class Todos extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { todos: [] };
    }
    handleClick = () => {
        let todo = this.todo.value;
        let todos = List(this.state.todos);
        todos = todos.push(todo);
        //每次都要生成一个新的对象，则内存占用高
        this.setState({ todos });
        //this.setState({})
    }
    //重写此方法以减少重新渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.todos === this.state.todos) {
            return false;//老的状态对象和新的状态对象如果是同一个吧，则不用再渲染了
        } else {
            return true;
        }
    }
    render() {
        console.log('render');
        return (
            <div>
                <input ref={input => this.todo = input} /><button onClick={this.handleClick}>+</button>
                <ul>
                    {
                        this.state.todos.map((todo, index) => (<li key={index}>{todo}</li>))
                    }
                </ul>
            </div>
        )
    }
}
