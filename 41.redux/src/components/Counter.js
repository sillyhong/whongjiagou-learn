import React, { Component } from 'react';
import {connect} from '../react-redux';
import actions from '../store/actions';
class Counter extends Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.increment}>+</button>
                <button onClick={this.props.thunkIncrement}>一秒后加1</button>
                <button onClick={this.props.promiseIncrement}>promise+1</button>
                <button onClick={this.props.payloadIncrement}>payload+1</button>
            </div>
        )
    }
}
export default connect(
    state=>state,
    actions
)(Counter);