import React, { Component } from 'react';
import {Route,Redirect} from '../react-router-dom';
//用来保护那些只有登录后才能访问的路由
//如果用户已经登录，则可以渲染组件，如果没登录，则需要跳转到登录页，登录后再跳回来
export default function ({component:Component,...rest}){
   return <Route {...rest} render={props=>(
    localStorage.getItem('login')?<Component {...props}/>:<Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
   )} />
}
// return <Route {...rest} render={props=>(
//     localStorage.getItem('login')?<Component {...props}/>:<Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
// )} />