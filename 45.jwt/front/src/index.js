import React from 'react';
import ReactDOM from 'react-dom';
//hashRouter 内置 hashHisotry
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from './history';
import Login from './components/Login';
import User from './components/User';
ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/user" component={User} />
            <Redirect to="/" />
        </Switch>
    </Router>, document.querySelector('#root')
);