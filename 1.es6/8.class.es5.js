"use strict";

var _createClass = function () {
  //target目录  props是属性对象数组
  function defineProperties(target, props) {
    //循环每个元素
    for (var i = 0; i < props.length; i++) {
      //取出每个属性描述器
      var descriptor = props[i];
      //可枚举 for in 能循环出来
      descriptor.enumerable = descriptor.enumerable || false;
      //可配置 可以通过delete 删除此属性
      descriptor.configurable = true;
      //可修改值
      if ("value" in descriptor) descriptor.writable = true;
      //真正的向Parent类的原型对象上增加属性
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  //1参数是构造函数 原型上的属性 静态属性(类上的属性)
  return function (Constructor, protoProps, staticProps) {
    //如果有原型属性的话
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
//类的调用检查 1参数是类的实例 2参数构造函数
function _classCallCheck(instance, Constructor) {
  //如果这个实例不是这个构造函数的实例的话，就报错了Cannot call a class as a function.不能把一个类当成普通函数来调用
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = function () {
  function Parent(name) {
    //为了保证这个类只能用来new对象
    _classCallCheck(this, Parent);

    this.name = name; //实例的私有属性
  }

  //属于实例的公有属性，也就是相当于原型上的属性


  _createClass(Parent, [{
    key: "getName",
    value: function getName() {
      console.log(this.name);
    }
  }]);

  return Parent;
}();