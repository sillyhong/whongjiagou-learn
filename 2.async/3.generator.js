/**
 * 生成器是一个函数，可以用来生成迭代器
 * 生成器函数和普通函数不一样，普通函数是一旦调用一定会执行完
 * 但是生成器函数中间可以暂停，可以执行一会歇一会
 */
//生成器函数有一个特点，需要加个*
//生成器有若干个阶段，如何划分这些阶段呢？
function *go(a){
  console.log(1);
  //此处的b用来供外界输入进来的
  //这一行实现输入和输出，本次的输出放在yield后面，下次的输入放在yield前面
  let b =  yield a;
  console.log(2);
  let c = yield b;
  console.log(3);
  return c;
}
//生成器函数和普通的函数不一样，调用它的话函数并不会立刻执行
//它会返回此生成器的迭代器,迭代器是一个对象，每调用一次next就可以返回一个值对象
let it = go("a值");
//next第一次执行不需要参数，传参数没有意义
let r1 = it.next();
//第一次调用next会返回一个对象，此对象有两个属性，一个是value就是yield后面那个值，一个是done表示是否迭代完成
console.log(r1);//{ value: 'a', done: false }
let r2 = it.next('B值');
console.log(r2);//{ value: 'B值', done: false }
let r3 = it.next('C值');
console.log(r3);//{ value: 'C值', done: true }