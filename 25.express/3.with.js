
//在with作用域里，变量名可以从obj的属性上取值
// with (obj) {
//     console.log('hello ' + name + ' age ' + age);
//     for (let i = 0; i < number; i++) {
//         console.log(i);
//     }
// }
//valueobject 值对象 作用域链 执行上下文栈 运行上下文对象

let str = `
<%if(user){%>
   hello <%=user.name%>
<%}else{%>
   hello guest
<%}%>
`;

let script = `
let tpl = ``;
with (obj) {
    if (user) {
        tpl += `hello cc`;
    } else {
        tpl += `hello guest`;
    }
}
return tpl;
`;
let obj = { user: { name: 'zfpx' } };
let fn = new Function('obj', script);
let result = fn(obj);
console.log(result);