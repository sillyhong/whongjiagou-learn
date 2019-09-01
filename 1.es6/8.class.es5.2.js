'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  //如果父类不是函数，并且父类不等于null
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  //给子类的构造函数重写原型prototype
  subClass.prototype = new superClass();
  //让子类的prototype 等于父类的一个实例。另外还要覆盖constructor,让constructor指向subClass,否则 constructor会指向superClass
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    //重定constructor
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  //subClass.__proto__ = superClass
  //让子类的__proto__等于父类，这一步是为了让子类继承父类的静态属性
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parent = function () {
  function Parent(name) {
    _classCallCheck(this, Parent);

    this.name = name; //实例的私有属性
  }

  //静态属性是类的属性


  _createClass(Parent, [{
    key: 'getName',

    //属于实例的公有属性，也就是相当于原型上的属性
    value: function getName() {
      console.log(this.name);
    }
  }], [{
    key: 'hello',
    value: function hello() {
      console.log('hello');
    }
  }]);

  return Parent;
}();

var Child = function (_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    //进行类调用检查，保证只能new
    _classCallCheck(this, Child);

    var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));
    //super指的是父类的构造函数


    _this.age = age;
    return _this;
  }

  _createClass(Child, [{
    key: 'getAge',
    value: function getAge() {
      console.log(this.age);
    }
  }]);

  return Child;
}(Parent);