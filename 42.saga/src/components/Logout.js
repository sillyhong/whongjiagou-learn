import React,{Component} from 'react';
import actions from '../store/actions';
import {connect} from 'react-redux';
class Logout extends Component{
    render(){
        return (
           <div>
               token: {this.props.token}
               error: {this.props.error}
               <button onClick={this.props.logout}>退出</button>
           </div>
        )
    }
}
export default connect(
    state=>({...state.user}),
    actions
)(Logout);