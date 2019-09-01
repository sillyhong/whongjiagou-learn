import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './components/TodoApp';
import { Provider } from 'react-redux';
import store from './store';
ReactDOM.render(
    <Provider store={store}>
        <TodoApp />
    </Provider>
    , document.getElementById('root'));
