import React, { Component } from 'react'
import { Prompt } from '../react-router-dom'
export default class UserAdd extends Component {
    constructor(props){
        super(props)
        this.state = {
            isBlocking: false
        }
        this.usernameRef = React.createRef()
    }        
    handleSubmit = (e) => {
        //防止刷新
        event.preventDefault();
        let username = this.usernameRef.current.value;
        let user = {id:Date.now(),username};
        let usersStr = localStorage.getItem('users');
        let users = usersStr?JSON.parse(usersStr):[];
        users.push(user);
        localStorage.setItem('users',JSON.stringify(users));
        this.props.history.push('/user/list');
        this.setState({
            isBlocking:false
        })
    }
    
    render() {
        const { isBlocking } = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <Prompt 
                    when={isBlocking}
                    message={location => `你确定要跳转到${window.location.pathname}吗？`}>
                </Prompt>
                <div>
                    <label>用户名</label>
                    <input 
                        type="tex"
                        onChange={event => {
                            console.log('onChange')
                            this.setState({isBlocking: event.target.value.length>0});
                        }}
                        ref={this.usernameRef} 
                        className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form> 
        )
    }
}
