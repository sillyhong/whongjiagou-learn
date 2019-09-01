import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/**
 * 组件是一个类，当它被使用的时候实例化，然后挂载到页面中
 */
class SubCounter extends Component {
    //当子组件将要接收到父组件传给它的新属性的时候
    componentWillReceiveProps() {
        console.log('SubCounter componentWillReceiveProps');
    }
    //Returned undefined instead of a boolean value. Make sure to return true or false.
    shouldComponentUpdate(nextProps, nextState) {
        console.log('SubCounter shouldComponentUpdate');
        if (nextProps.count <= 5) {
            return true;
        } else {
            return false;
        }
    }
    componentWillUpdate() {
        console.log('SubCounter componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('SubCounter componentDidUpdate');
    }
    render() {
        return (
            <div>
                子计数:{this.props.count}
            </div>
        )
    }
}

export default class Counter extends Component {
    //默认属性对象
    static defaultProps = {
        count: 0
    }
    constructor(props) {
        console.log('constructor');
        super(props);
        this.state = { count: props.count };//初始化默认状态对象
    }
    componentWillMount() {
        console.log('1.组件将要挂载 componentWillMount');
    }
    handleClick = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }
    //询问组件是否要被更新,当一个组件的属性或者状态只要有一个发生了改变 ，默认就会重新渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.count < 10) {
            return true;
        } else {
            return false;
        }
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
    destroy = () => {
        window.clearInterval(this.timer);
        ReactDOM.unmountComponentAtNode(document.querySelector('#root'));
    }
    render() {
        console.log('2.render 挂载');
        return (
            <div>
                父计数器:{this.state.count}
                <button onClick={this.handleClick}>+</button>
                <button onClick={this.destroy}>destroy</button>
                <SubCounter count={this.state.count} />
            </div>
        )
    }
    //组件挂载完成
    componentDidMount() {
        console.log('3.componentDidMount 组件挂载完毕');
        //Can't call setState (or forceUpdate) on an unmounted component
        //This is a no-op, but it indicates a memory leak in your application
        this.timer = window.setInterval(() => {
            this.setState(prevState => ({
                count: prevState.count + 1
            }));
        }, 1000);
    }
}

/**
 * 父组件 子组件
 * 
 */