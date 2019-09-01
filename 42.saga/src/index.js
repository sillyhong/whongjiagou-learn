import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import {Provider} from 'react-redux';
import store from './store';
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
import {Route,Switch,Redirect} from 'react-router-dom';
let history = createHistory();
ReactDOM.render(
    <Provider store={store}>
       <ConnectedRouter history={history}>
         <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Redirect to="/login"/>
         </Switch>
       </ConnectedRouter>
    </Provider>
,document.querySelector('#root'));