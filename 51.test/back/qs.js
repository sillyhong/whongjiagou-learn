let qs = require('./qs');
//const assert = require('assert');
function assert(expression, message) {
    if (!expression) {
        throw new Error(message);
    }
}
//断言是表示我们系统的一个预期 ，如果实际情况和预期相同，那么就什么都不说，如果实际情况和预期不同的，报错
assert(qs.parse('name=zfpx').name == 'zfpx', '姓名必须是zfpx');
assert(qs.parse('name=zfpx&age=9').age == 10, '年龄必须是9');


assert(qs.stringify({ name: 'zfpx' }) == 'name=zfpx', '一个字段时不正确');
assert(qs.stringify({ name: 'zfpx', age: 9 }) == 'name=zfpx&age=9', '二个字段时不正确');

