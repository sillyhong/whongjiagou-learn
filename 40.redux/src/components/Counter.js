import React, { Component } from 'react';
import store from '../store';
import actions from '../store/actions/counter';
import {connect} from '../react-redux';
//bindActionCreator用来实现actionCreator和dispatch的绑定
//let newActions = bindActionCreator(actions,store.dispatch);

// action.increment    dispatch(action.increment());
class Counter extends Component {
    constructor(props){
        super(props);
        this.state = {number:props.number};
    }
    componentWillMount(){
        this.unsubscribe = store.subscribe(()=>{
            this.setState({number:this.props.number});
        });
    }
    componentWillUnmount(){
        this.unsubscribe();//取消订阅
    }
    render() {
        return (
            <div style={{border:'1px solid red'}}>
                <p>{this.state.number}</p>
                <button onClick={this.props.increment} >+</button>
                <button onClick={this.props.decrement}>-</button>
                <button onClick={()=>{
                    setTimeout(()=>{
                        this.props.increment()
                    },1000);
                }}>过一秒后再加</button>
            </div>
        )
    }
}
//connect是一个高阶组件函数
//把仓库中的状态树映射为当前组件的属性对象
//负责输入，就是把仓库中的状态输入到组件，
//let mapStateToProps = state=>state.counter;
//把store的dispatch方法转换成一个当前组件的属性对象
//输出 把用户在组件中的操作发射出去
//1.种
// let mapDispatchToProps = dispatch = ({
//    increment:()=>dispatch(action.increment)
// })
//2.直接把actionCreator放在这。这也是
//let mapDispatchToProps = actions;
export default connect(
    state=>state.counter,
    actions
)(Counter);