let element = <h1>hello</h1>;
//webpack 会把JSX转成JS代码 babel-loader babel-preset-react
let element = React.createElement('h1', {}, 'hello');
