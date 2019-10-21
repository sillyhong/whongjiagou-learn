import React, { Component } from 'react'
import { HashContext } from '../context/HashContext'
import pathToRegExp from 'path-to-regexp'
export default class Switch extends Component {
    static contextType = HashContext
    render() {
        const { pathname } = this.context.location
        const  childrens = this.props.children
        console.log('switch', this.props)
        for(let i = 0; i < childrens.length; i++) {
            let child = childrens[i]
            let { path, exact=false } = child.props
            let reg = pathToRegExp(path, [], { end: exact })
            let result = pathname.match(reg)
        console.log('pathname', pathname, 'result', result)

            if(result){
                return child
            }
        }
        return null
    }
}
