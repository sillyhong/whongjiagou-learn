import React, { Component } from 'react';
// /user/detail/1
// /user/detail/:id 
//  params.id
export default class UserDetail extends Component {
    constructor(){
        super();
        this.state = {user:{}};
    }
    componentDidMount(){
        console.log('detail', this.props);
        let usersStr = localStorage.getItem('users');
        let users = usersStr?JSON.parse(usersStr):[];
        let user = users.find(user=>user.id == this.props.match.params.id);
        this.setState({user});
    }

    render() {
        return (
          <div>
            {this.state.user.id}:{this.state.user.username}
          </div>
        )
    }
}