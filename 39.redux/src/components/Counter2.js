import React, { Component } from 'react';
import * as types from '../store/action-types';
import store from '../store';
function action(type) {
    store.dispatch({ type })
}

export default class Counter extends Component {
    constructor() {
        super();
        this.state = { number: store.getState().counter2.number };
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({ number: store.getState().counter2.number });
        });
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => action(types.ADD)} >+</button>
                <button onClick={() => action(types.MINUS)} >-</button>
            </div>
        )
    }
}