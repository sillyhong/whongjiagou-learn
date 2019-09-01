/**
 * immutable  可以基于共享部分对象来创建新的对象
 */
////let { Map, fromJS } = require('immutable');
// let m1 = Map({ a: 1, b: 2, c: 3 });
// console.log(m1.get('a'));
// let m2 = m1.set('a', '11');
// console.log(m2.get('a'));//11
// console.log(m1.get('a'));//1
// console.log(m1 === m2);

//let m1 = fromJS({ a: 1, b: { c: 1 } });
// let m2 = m1.set('a', 11);
// console.log(m1.get('a'));
// console.log(m2.get('a'));
// console.log(m1.b === m2.b)
//let m2 = m1.setIn(['b', 'c'], 'c');
//let m2 = m1.updateIn(['b', 'c'], val => val + 2);
//console.log(m2.getIn(['b', 'c']));
function Map(obj) {
    return {
        set(key, val) {
            let newObj = { ...obj };
            newObj[key] = val;
            return Map(newObj);
        },
        get(key) {
            return obj[key];
        }
    }
}
let m1 = Map({ a: 1, b: 2, home: { name: 'beijing' } });
let m2 = m1.set('b', '22');
console.log(m2.get('b'));