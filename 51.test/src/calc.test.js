let calc = require('./calc');
test('divide', () => {
    expect(calc.divide(2, 1)).toBe(2);
    expect(calc.divide(2, 0)).toThrow();
});