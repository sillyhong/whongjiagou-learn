import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Title extends Component {
    static contextTypes = {
        color: PropTypes.string
    }
    render() {
        //this.context
        return (
            <div>
                <h1 style={{ color: this.context.color }}>我是标题</h1>
            </div>
        )
    }
}
class Content extends Component {
    static contextTypes = {
        color: PropTypes.string,
        setColor: PropTypes.func
    }
    render() {
        console.log(this.context);
        return (
            <div>
                <h1 style={{ color: this.context.color }}>我是内容</h1>
                <button onClick={()=>this.context.setColor('green')}>变绿</button> 
                <button onClick={()=>this.context.setColor('yellow')}>变黄</button> 
            </div>
        )
    }
}
class Header extends Component {
    render() {
        return (
            <div>
                <Title />
            </div>
        )
    }
}
class Main extends Component {
    render() {
        return (
            <div>
                <Content />
            </div>
        )
    }
}
/**
 * 1.  在父组件里定义 childContextTypes 子上下文类型
 * 2. 在父组件里还要定义一个getChildContext用来返回上下文对象
 * 3. 在要接收这些上下文对象的组件里写义contextTypes
 */
export default class HomePage extends Component {
    static childContextTypes = {
        color: PropTypes.string,
        setColor:PropTypes.func
    }
    getChildContext() {
        return {
            color: this.state.color,
            setColor:this.setColor
        }
    }
    //状态不能别人改，只能自己改。
    constructor() {
        super();
        this.state = { color: 'red' };
    }
    setColor = (color)=>{
        this.setState({color});
    }
    render() {
        return (
            <div>
                <Header />
                <Main />
            </div>
        )
    }
}