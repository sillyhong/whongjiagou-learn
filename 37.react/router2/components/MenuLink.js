import React, { Component } from 'react'
import { Route, Link } from '../react-router-dom';
// import { Route, Link } from 'react-router-dom';
import './MenuLink.css'
export default ({to, children}) => {
    return <Route path={to} children={(props)=>{
        return <li className={"nav-item" + (props.match ? "-active": "")}>
            <Link to={to} className="nav-link">{children}</Link>
        </li>
    }}/>
}
