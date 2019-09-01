import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import Counter2 from './components/Counter2';
ReactDOM.render(<div>
    <Counter />
    <Counter2 />
</div>, document.querySelector('#root'));