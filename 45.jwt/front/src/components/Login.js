import React, { Component } from 'react';
import { signin } from '../api';
export default class Login extends Component {
    handleSubmit = (event) => {
        event.preventDefault();// /signin
        let username = this.username.value;
        let password = this.password.value;
        signin({ username, password }).then((response) => {
            if (response.code == 0) {
                this.props.history.push('/user');
            }
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                用户名 <input ref={ref => this.username = ref} />
                密码 <input ref={ref => this.password = ref} />
                <input type="submit" />
            </form>
        )
    }
}