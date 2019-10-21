import React, { Component } from 'react'
import { HashContext } from '../context/HashContext'



export default class Link extends Component {
    static contextType = HashContext
    render() {
        const { to } = this.props
        return (
            <a onClick={()=>{
                this.context.history.push(to)
                }}>
                {this.props.children}
            </a>
        )
    }
}
