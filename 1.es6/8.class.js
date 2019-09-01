//定义一个类
/**
 * 以前JS里类和构造函数是一体的
 * 类里可以定义构造函数,当你创建一个类的实例的时候就会调用构造函数
 */
/*class Parent{
  constructor(name){
    this.name = name;//实例的私有属性
  }
  //静态属性是类的属性
  static hello(){
    console.log('hello');
  }
  //属于实例的公有属性，也就是相当于原型上的属性
  getName(){
    console.log(this.name);
  }
}
class Child extends Parent{
  constructor(name,age){
    //super指的是父类的构造函数
    super(name);
    this.age = age;
  }
  getAge(){
    console.log(this.age);
  }
}*/
//Class constructor Parent cannot be invoked without 'new'
//类的构造函数Parent不能在不通过new的情况下调用
//Parent('zfpx');
/*
let  p = new Parent('zfpx');
p.getName();*/


/*
Object.create = function(prototype){
  //先创建一个空的函数
  function Fn(){};
  Fn.prototype = prototype;
  //返回这个函数的实例
  return new Fn();//__proto__
}*/

function Parent(name){
  this.name = name;
}
//静态属性是属于类的，不需实例就能调用
Parent.hello = 'hello';
function Child(){

}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
let child = new Child();
console.log(child.constructor);
console.log(child.name);
// child.__proto__.__proto__ = Parent.prototype

//不需要通过实例来调用，是属于类的。
class Hello{
  static defaultProps = {}
  static propTypes = {}
}
//类 和类的实例
//一个属性如果放在原型上的话，是可能通过实例来调用的
//但是放在类上的，不能通过实例来调用，只能用过类名来调用

//.__proto__ setPrototypeOf 和 .prototype 有区别吗？
//继承是通过 __proto__来关联的
//setPrototypeOf 其实就是给__proto__赋值
