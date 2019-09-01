import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter';
import Todos from './components/Todos';
import {Provider} from './react-redux';
import store from './store';
ReactDOM.render((
    <Provider store={store}>
       <React.Fragment>
         <Counter/>
            <br/>
         <Todos/>
       </React.Fragment>
    </Provider>
),document.querySelector('#root'));