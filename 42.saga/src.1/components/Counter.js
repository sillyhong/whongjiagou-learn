import React,{Component} from 'react';
import actions from '../store/actions';
import {connect} from 'react-redux';
class Counter extends Component{
    render(){
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.increment}>+</button>
            </div>
        )
    }
}
export default connect(
    state=>({...state}),
    actions
)(Counter);