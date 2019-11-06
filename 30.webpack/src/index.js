import name from './base';
import React from 'react';
import ReactDOM from 'react-dom';
import ajax from 'ajax';
let result = ajax('/ajax');

ReactDOM.render(<h1>{result}</h1>, document.getElementById('root'));
// fetch fetch.js fetch.json fetch文件夹
let fetch = require('fetch');
//console.log(fetch);
//let get = require('../dist/bundle.js');
//get.getName();
console.log('hello');

// let name = 'zfpx';
console.log(name);
if (__development__ == 'development') {
    let s = 'ssssssssssssssssssssssss';
    console.log(s);
    console.log(s);
    console.log(s);
    console.log(s);
}

