import React, { Component } from 'react'
import  {HashContext} from '../context/HashContext';

import pathToRegExp from 'path-to-regexp';
export default class Route extends Component {
    static contextType = HashContext 
    render() {
        //userDetail/:id
       const { pathname } = this.context.location 
    //    console.log('route', pathname, 'this.context', this.context)
       const { path, component: Component, exact=false, render, children } = this.props
       let keys = []
       const regexp = pathToRegExp(path, keys, {end: exact})
       let result = pathname.match(regexp)
    //    console.log('path', path, 'regexp', regexp)
        // console.log('this.props', this.props)

       if(result){
        // console.log('result', result, 'compontent', Component)
           let [url, ...values ] = result
           keys = keys.map(key => key.name)// ['userDetail', 'id']
           const params =  keys.reduce((memo, key, index) => {
                memo[key] = values[index]
                return memo
           }, {})

           let match =  {
            isExact: exact,
            params,
            path,
            url
           }

           const props = {
               location: this.context.location,
               history: this.context.history,
               match
           }
        //    debugger
            //判断返回的是render 还是component
            if(Component){
                return <Component {...props}/>
            }else if(render){
                return render(props);
            }else if(children){
                return children(props);
            }else{
                return null;
            }
       }else{
           if(children){
            return children(this.props)
           }else{
               return null
           }
       }
    }
}
