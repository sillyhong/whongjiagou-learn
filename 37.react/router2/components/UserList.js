import React, { Component } from 'react';
import {Link} from '../react-router-dom';
export default class UserAdd extends Component {
    constructor(){
        super();
        this.state = {users:[]};
    }
    componentDidMount(){
        let usersStr = localStorage.getItem('users');
        let users = usersStr?JSON.parse(usersStr):[];
        this.setState({users});
    }
    render() {
        return (
            <ul className="list-group">
                {
                    this.state.users.map((user,index)=>(
                        <li key={index} className="list-group-item">
                          <Link to={"/user/detail/"+user.id}>{user.username}</Link>
                        </li>
                    ))
                }
            </ul>
        )
    }
}