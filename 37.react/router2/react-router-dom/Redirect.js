import React, { Component } from 'react'
import { HashContext } from '../context/HashContext'

export default class Redirect extends Component {
    static contextType = HashContext
    componentWillMount() {
        console.log('redirect this.context', this.context,'this.props.to', this.props.to)
        this.context.history.push(this.props.to)
    }
    render() {
        return null
    }
}


