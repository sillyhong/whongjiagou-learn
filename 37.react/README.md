 [1.类型检测](#1)
##1.类型检测 
##2.生命周期
##3.dom diff 
##4.React.fragmen片段
##5.优化相关
##6.context上下文 redux中的Provider 是通过context实现的   koa中间件原理和redux中间件原理一样
##6.portal
##7.ErrorBoundary
##8.react-router


##性能优化相关
- React.fragmen片段
- 使用performance监控，或者使用reactd-devtool插件工具查看性能问题
- pureComponent实现原理  
facebook/immutablejs
优化seamless-immutable ：使用Object.defineProperty跨站了JavaScript的Array和Object对象来实现，只支持Array和Object两种数据类型
```
let immutable = require(`semeless Immutable`)
let objA = immutable(info: {age: 8})
let objB = objA.merge({info: {age: 9}})
console.log('objA', objA.info.age)
console.log('objB', objB.info.age)
```

seamless-immutable 与immutable比较，体积小，api简单， 支持的类型不多


##其他
控制套报错 直接跳进文件 打断点 ==》 刷新页面


<h1 id="1">1.类型检测</h1>
- 要在组件的 props 上进行类型检查，你只需配置特定的 propTypes 属性
- 您可以通过配置特定的 defaultProps 属性来定义 props 的默认值：

```
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、元素或数组）
  // (或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,

  // 一个 React 元素。
  optionalElement: PropTypes.element,

  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `onOfType` 中不会起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

[PropTypes相关文档地址](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes)







