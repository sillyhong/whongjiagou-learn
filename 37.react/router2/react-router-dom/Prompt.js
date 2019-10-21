import React, { Component } from 'react'
import { HashContext } from '../context/HashContext'
export default class Prompt extends Component {
    static contextType = HashContext
    componentWillMount() {
        this.context.history &&  this.context.history.unblock()
    }
    render() {
        this.history = this.context.history
        const { when, message } = this.props
        if(when){
            this.history.block(message)
        }
        // else{
        //     this.history.unBlock(null)   
        // }
       return null
    }
}
