// import React from 'react'
// import { Route } from '../react-router-dom';
// export default function (Component) {
//     console.log('Component', Component)
//     return (props)=>(
//         <Route render={routeProps=> <Component {...routeProps}/>}/>
//     )
    
// }


import React, { Component } from 'react'

import { Route, Redirect } from '../react-router-dom'

export default function ({component: Component, ...rest}){
    return <Route {...rest}  render={props => (
    //     console.log('protected props', props, 'Component', Component)
    //     // localStorage.getItem('login') ? <Component {...props}/> : <Redict to={'/login'} from={props.location.pathname}/>
    //    true ? <Component {...props}/> : <Redict to={'/login'} from={props.location.pathname}/>
        true ? <Component {...props}/> : <Redirect to={{pathname:'/login',state:{from:props.location.pathname}}}/>
    )}/>
    
}