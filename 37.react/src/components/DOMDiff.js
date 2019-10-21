import React, { Component } from 'react';
class Counter extends Component {
    constructor() {
        super();
        this.ts = new Date().toLocaleString();
    }

    //componentWillUnmount  ==> componentWillMount ==> componentDidMount 
    componentWillUnmount() {
        // console.log(this.ts + ' componentWillUnmount');
        console.log(this.ts + ' componentWillUnmount');
    }
    componentWillMount() {
        console.log(this.ts + ' componentWillMount');
    }
    componentDidMount() {
        console.log(this.ts + ' componentDidMount');
    }
    render() {
        return (
            <div>Counter</div>
        )
    }
}
export default class Main extends Component {
    constructor() {
        super();
        this.state = { show: true };
    }
    render() {
        return (
            <div>
                <button onClick={() => this.setState({ show: !this.state.show })}>update</button>
                {
                    this.state.show ? <div>
                        <Counter />
                    </div> : <span>
                            <Counter />
                        </span>
                }
            </div>
        )
    }
} 