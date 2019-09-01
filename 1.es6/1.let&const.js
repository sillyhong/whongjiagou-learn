/**
 * var
 * 1. 可以重复声明
 * 2. 不能定义常量 var PI = 3.14
 * 3. 不支持块级作用域 if(true){var a = 10;}
 **/
//Identifier 'a' has already been declared
//变量名a已经定义过了，不能重复声明
/*let a = 10;
let a = 20;*/

//不能定义常量
/*const PI = 3.14;
//试图给一个常量赋值,这是错误
PI = 3.15;*/

/*if(true){
  let a = 10;
}
//a is not defined
console.log(a);*/
//以前JS只有二个作用域，一个全局，一个函数级
// ;(function(){
//
// })();
// let a = 20;
// {
//   //a is not defined
//   //let没有预解释
//   console.log(a);
//   let a = 10;
// }

// for(var i=0;i<3;i++){
//   (function(i){
//     setTimeout(function(){
//       console.log(i);
//     },1000)
//   })(i)
// }

const PI = 3.14;
console.log(PI);
//虽然说常量不能再引用别的对象了，但是它的值如果是一个引用类型的话，引用对象的属性还是可以改的
const USER = {name:'zfpx'};
USER.name= 'zfpx2';

{
  const PI = 3.15;
}
//es6中新增加的二种声明变量的方式，可以解决以前var的一些问题



