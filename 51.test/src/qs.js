//把一个字符串转成对象name=zfpx&age=9=> {name:'zfpx',age:9}
function parse(str) {
    let obj = {};
    let arr = str.split('&');
    arr.forEach(item => {
        let [key, value] = item.split('=');
        obj[key] = value;
    });
    return obj;
}

//把一个对象转成字符串 {name:'zfpx',age:9}=>name=zfpx&age=9
function stringify(obj) {
    let arr = [];
    for (let key in obj) {
        arr.push(key + '=' + obj[key]);
    }
    return arr.join('&');
}
exports.parse = parse;
exports.stringify = stringify;

// console.log(parse('name=zfpx').name == 'zfpx');
// console.log(parse('name=zfpx&age=9').age == 9);

// console.log(stringify({ name: 'zfpx' }) == 'name=zfpx');
// console.log(stringify({ name: 'zfpx', age: 9 }) == 'name=zfpx&age=9');