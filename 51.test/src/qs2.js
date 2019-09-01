let qs = require('./qs');
//如何定义一个测试用例
//expect期望
describe('parse', () => {
    test('one', () => {
        expect(qs.parse('name=zfpx').name).toBe('zfpx');
    });
    test('two', () => {
        expect(qs.parse('name=zfpx&age=9').age).toBe("9");
    });
});
//describe分组，把相类似的测试用例分成一个组
describe('stringify', () => {
    test('one', () => {
        expect(qs.stringify({ name: 'zfpx' })).toBe('name=zfpx');
    });
    test('two', () => {
        expect(qs.stringify({ name: 'zfpx', age: 9 })).toBe("name=zfpx&age=9");
    });
}); 
