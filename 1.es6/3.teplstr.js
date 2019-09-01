let name = 'zfpx', age = 9;
//let desc = name+" 今年 "+ age+" 岁了";
//1.字符串里可以嵌套变量
//模板语言很多就是这样的原理
/*let desc = "${name} 今年 ${age} 岁了";
function replace(desc) {
  return desc.replace(/\$\{([^}]+)\}/g, function (matched,key) {
    console.log(arguments);
    return eval(key);
  });
}
console.log(replace(desc));*/
//模板字符串
//模板字符串可以折行 换行
let users = [{id:1,name:'zfpx1'},{id:2,name:'zfpx2'}];
/**
 * <ul>
 *   <li>1:zfpx1</li>
 *   <li></li>
 * </ul>
 **/
//映射，把老数组里的每一个元素映射为新数组的每一个元素
/*
let newLis = users.map(function(user,index){
  return  `<li>${user.id}:${user.name}</li>`;
}).join('');
let ul = (
  `
  <ul>
  ${newLis}
   </ul>
  `
);
console.log(ul);*/
//其他运算符 会把后面所有参数全都放在一个数组里
//rest其它运算符只能作为最后一个参数
//因为有些时候我们希望有自己的拼接模板字符串的逻辑
function desc(strings,...values){
  console.log(strings);
  let result='';
  for(let i=0;i<values.length;i++){
    result += (strings[i]+values[i]);
  }
  result += strings[strings.length-1];
  return result.toUpperCase();
}
//带标签的模板字符串就像一个函数调用,参数
//1参数是文本的数组
let str = desc`${name} 今年 ${age} 岁了`;
console.log(str);

let address1 = 'http://www.baidu.com';
let address2 = 'ftp://www.baidu.com';
if(address1.startsWith('http')){
  console.log('http网址');
}else if(address2.startsWith('ftp')){
  console.log('ftp服务器');
}

let filename = 'avatar.jpg';
if(filename.endsWith('jpg')||filename.endsWith('png')){
  console.log('是一张图片');
}

let content = 'abc';
//判断一个字符串是否包含另一个字符串
console.log(content.includes('b'));
console.log(content.indexOf('b')!=-1);

let x = 'xx';
console.log(x.repeat(3));

let str5 = '7';
//  00abc   abc00
//时钟 时间 7:5  07:05
console.log("("+str5.padStart(2,'0')+")");
console.log("("+str5.padEnd(2)+")");

