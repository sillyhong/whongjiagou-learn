import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './react-redux';
import store from './store';
import Counter from './components/Counter';
ReactDOM.render((
    <Provider store={store}>
        <Counter />
    </Provider>
), document.querySelector('#root'));