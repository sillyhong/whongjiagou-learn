let chalk = require('chalk');
let colors = ['red', 'green', 'yellow', 'blue', 'magenta'];
let colorIndex = 0;
module.exports = function (name) {
    return function (...args) {
        //判断当前环境变量中DEBUG的值和name的值是否匹配，如果匹配则输出，不匹配则不输出
        let DEBUG = process.env.DEBUG;
        if (DEBUG.indexOf('*') != -1) {
            if (new RegExp(DEBUG.replace('*', '[\\S\\s]+')).test(name)) {
                print();
            }
        } else {
            if (DEBUG == name) {
                print();
            }
        }
        function print() {
            args.unshift(chalk[colors[colorIndex]]("  " + name));
            args.push(chalk[colors[colorIndex]]('+0ms'))
            colorIndex = colorIndex + 1 >= colors.length ? 0 : colorIndex + 1;
            console.log.apply(null, args);
        }
    }
}