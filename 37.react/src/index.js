import React from 'react';
import ReactDOM from 'react-dom';
import Person from './components/Person';
import Page from './components/Page';
import Todos from './components/Todos';
import DOMDiff from './components/DOMDiff';
import HomePage from './components/HomePage';
import MyHomePage from './components/MyHomePage';
import Modal from './components/Modal';
import ErrorBoundary from './components/ErrorBoundary';

//类型检测
// ReactDOM.render(<Person
//     // name='123'
//     age={130}
//     gender='男'
//     hobby={[1,1,23,3]}
//     position={{x:2, y:2}}
//     hasFriend={false}
//     heightRange={{min: 30, max: 250}}
//     />, document.querySelector('#root'));

//组件更新
// ReactDOM.render(<Todos></Todos>, document.getElementById('root'))

//dom diff 
// ReactDOM.render(<DOMDiff></DOMDiff>, document.getElementById('root'))

//context上下文
ReactDOM.render(<HomePage></HomePage>, document.getElementById('root'))
// ReactDOM.render(<MyHomePage></MyHomePage>, document.getElementById('root'))

//portal
// ReactDOM.render(<Modal/>, document.getElementById('root'))

//errorBoundary
// ReactDOM.render(<ErrorBoundary/>, document.getElementById('root'))

// ReactDOM.render(<ErrorBoundary />, document.querySelector('#root'));


