//减少变量的生命周期
// let obj = { name: 'zfjx'}
// const { name: Name } = obj
// console.log('name', Name)

// this.props.name 与this.state.name 比较
// const { name } = this.prop
// const { name: Name } = this.state
// name == Name

let pathToRegExp = require('path-to-regexp');
let str = '/user/detail/:id/:name';
let keys = [];
let reg = pathToRegExp(str,keys,{end:true});
console.log('reg', reg)
keys = keys.map(key=>key.name);//返回值 【'id', 'name'】

let uri = '/user/detail/1/zfpx';
let result = uri.match(reg);
console.log('result', result)
let  [url,...values] = result;
console.log('url', url, 'values', values)
let params =  keys.reduce((memo,key,idx)=>{
    memo[key] = values[idx];
    return memo;
},{});
console.log('keys', keys);
console.log(uri == url);
console.log('params', params);




let regx2 = pathToRegExp('/home',[],{end:false});
console.log(regx2.test('/home'));
console.log(regx2.test('/home/'));
console.log(regx2.test('/home//'));
console.log(regx2.test('/home/2'));