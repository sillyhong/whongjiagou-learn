let str = `
<%if(user){%>
   hello <%=user.name%>
<%}else{%>
   hello guest
<%}%>
<ul>
<%for(let i=0;i<total;i++){%>
  <li><%=i%></li>
<%}%>
</ul>
`;
//它的原理就是拼出一段函数体代码，然后把obj做为作用域变量提供属性
let options = { user: { name: 'zfpx' }, total: 5 };
let ejs = require('ejs');
function render(str, options, callback) {
    let head = "let tpl = ``;\nwith (obj) {\n tpl+=`";
    str = str.replace(/<%=([\s\S]+?)%>/g, function () {
        return "${" + arguments[1] + "}";
    });
    str = str.replace(/<%([\s\S]+?)%>/g, function () {
        return "`;\n" + arguments[1] + "\n;tpl+=`";
    });
    let tail = "`}\n return tpl; ";
    let html = head + str + tail;
    let fn = new Function('obj', html);
    let result = fn(options);
    callback(null, result);
}
let result = render(str, options);//hello zfpx
console.log(result);

//在JS有三种作用域 全局作用域 函数作用域 with作用域
