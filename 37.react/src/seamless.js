let immutable = require('seamless-immutable');
// let m1 = immutable({ a: 1, b: 2, c: 3, info: { name: 'zfpx' } });
// let m2 = m1.merge({ a: 11, b: 22, c: 33 })
// console.log(m2.b)
let obj = immutable({ age: 8 });
handle(obj);
console.log(obj.age);

function handle(obj) {
    obj.age = 100;
}