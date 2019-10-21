import React, { Component } from 'react'
import { HashContext } from '../context/HashContext';
(function (history) {
    var pushState = history.pushState;
    history.pushState = function (state,title,pathname) {
        //重新pushState放啊
        if (typeof window.onpushstate == "function") {
            window.onpushstate(state,pathname);
        }
        return pushState.apply(history, arguments);
    };
})(window.history);
export default class BrowserRouter extends Component {
    state = {
        location: { pathname: '/' }
    }
    constructor(props) {
        super(props)
        let that = this
        this.state = {
            location: {
                pathname: '/',
                state: {},
            },
            history: {
                push(to) {
                    if(that.getMessage){
                        let allow=window.confirm(that.getMessage(that.state.location)+`，并且跳转到${typeof to === 'object' ? to.pathname: to}吗?`);
                        that.getMessage = null
                        if (!allow) return;
                    }
                    if (typeof to === 'object') {
                        let { pathname, state } = to;
                        that.setState({
                            location: {
                                ...that.state.location,
                                pathname,
                                state
                            }
                        })
                        window.history.pushState(state, '', pathname);
                    } else {
                        window.history.pushState('', '', to);
                        that.setState({
                            location: {
                                ...that.state.location,
                                pathname: to,
                            }
                        })
                    }
                },
                block(getMessage) {
                    that.block = getMessage;
                },
                unblock() {
                    that.block = null;
                }
            }
        }
    }
    locationState  = undefined
    getMessage = null
    componentDidMount() {
        window.onpopstate = (event) => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname:document.location.pathname,
                    state:event.state
                }
            });
        };
        window.onpushstate = (state,pathname) => {
            this.setState({
                location: {
                    ...this.state.location,
                    pathname,
                    state
                }
            });
        };
    }
    render() {
     
        return (
            <HashContext.Provider value={this.state}>
                {this.props.children}
            </HashContext.Provider>
        )
    }
}