let name='zfpx';
let age= 9;
//如果对象的属性名和变量名如果一样的话可以二合一
let obj = {name,age};
//console.log(obj);

let obj1 = {age:1,getFood(){
  return '面包';
}};
let obj3 = {
  __proto__:obj1,
  getFood(){
    //super可以调用父亲的方法
    return '牛奶'+super.getFood();
  }
};
/*
//设置obj3的原型为obj1
//Object.setPrototypeOf(obj3,obj1);
obj3.__proto__ = obj1;*/
console.log(obj3.getFood());
//super

