
let forEach = require('./forEach');
test('forEach', function () {
    const mockCallback = jest.fn();
    forEach([1, 2, 3], mockCallback);
    expect(mockCallback.mock.calls.length).toBe(3);
    expect(mockCallback.mock.calls[0][0]).toBe(1);
    expect(mockCallback.mock.calls[1][0]).toBe(2);
    expect(mockCallback.mock.calls[2][0]).toBe(3);
});