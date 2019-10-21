import React,{Component} from 'react';
import PropTypes from 'prop-types';
export default class Login extends Component{
   handleClick=()=>{
       console.log('login', this.props.location.state.from)
      localStorage.setItem('login',true);
     this.props.history.push(this.props.location.state.from);
   }
   render(){
       return (
           <div>
               <button onClick={this.handleClick} className="btn btn-primary">登录</button>
           </div>
       );
   }
}