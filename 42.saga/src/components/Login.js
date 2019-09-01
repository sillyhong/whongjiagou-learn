import React,{Component} from 'react';
import actions from '../store/actions';
import {connect} from 'react-redux';
class Login extends Component{
    handleSubmit = (event)=>{
         event.preventDefault();  
         let username = this.username.value;
         let password = this.password.value;
         this.props.login(username,password);
    }
    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                用户名 <input type="text" ref={input=>this.username = input} /><br/>
                密码 <input type="text" ref={input=>this.password = input} /><br/>
                <input type="submit"/>
            </form>
        )
    }
}
export default connect(
    state=>({...state.user}),
    actions
)(Login);