import React, { Component } from 'react'
import { HashContext } from '../context/HashContext'


export default class HashRouter extends Component {
     
    constructor(){
        super()
        let that = this
        this.state = {
            location: {
                pathname: window.location.hash.slice(1) || '/',
                state: {},
            },
            history: {
                push: (to) => {
                    console.log('that.getMessage', that.getMessage)
                    if(that.getMessage){
                        let allow=window.confirm(that.getMessage(that.state.location)+`，并且跳转到${typeof to === 'object' ? to.pathname: to}吗?`);
                        that.getMessage = null
                        if (!allow) return;
                    }
                    if(typeof to === 'object'){
                        const { pathname, state } = to
                        console.log('跳转', pathname)
                        that.locationState = state
                        that.setState({location: { ...that.state.location, state}}, () => {
                            window.location.hash = pathname
                        })
                    }else{
                        window.location.hash = to
                    }
                },
                block: (message) => {
                    that.getMessage = message
                },
                unblock: () => {
                    that.getMessage = null;
                }
            },
            // locationState: undefined,
            // getMessage: null
        }
        this.locationState  = undefined
        this.getMessage = null 
    }

    
    componentDidMount() {
        window.addEventListener('hashchange', () =>{
            console.log('hashchange')
            this.setState({
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/',
                    locationState: this.locationState
                }
            })
        })
    }
    
    render() {
        // console.log('this.state', this.state)
        return (
            <HashContext.Provider value={this.state}>
                {this.props.children}
            </HashContext.Provider> 
        )
    }
}
