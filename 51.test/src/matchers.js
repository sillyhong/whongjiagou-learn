let a = {
    name: 'a',
    home: 'beijing'
}
let b = {
    name: 'a',
    home: 'beijing'
}
test('tobe', () => {
    expect(1).toBe(1);
    expect('h').toBe('h');
    expect(a).toEqual(b);
    expect([1, 2, 3]).toEqual([1, 2, 3]);
    expect(a.xx).toBeUndefined();
    expect(null).toBeNull();
});

test('contain', function () {
    expect(a).toHaveProperty('name');
    expect('abc').toContain('b');
    expect(['a', 'b', 'c']).toContain('c');
    expect('1982').toMatch(/\d{4}/);
});

test('logic', () => {
    expect(1 == 1).toBeTruthy();
    expect(1 == 2).toBeFalsy();
    expect(3).toBeLessThan(4);
    expect(3).toBeGreaterThan(2);
    expect(3).not.toBeGreaterThan(4);
});