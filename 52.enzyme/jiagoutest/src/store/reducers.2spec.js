let reducers = require('./reducer');
let actionTypes = require('./action-types');
let INIT_STATE = [
    { id: 1, text: '1', completed: false },
    { id: 2, text: '2', completed: false }
]
describe('测试reducers', function () {
    it('测试初始状态', function () {
        expect(reducers(undefined, {})).toEqual(INIT_STATE);
    });
    it('测试增加TODO', function () {
        let todo = { id: 3, text: '3', completed: false };
        expect(reducers(INIT_STATE, { type: actionTypes.ADD_TODO, todo })).toEqual(
            [...INIT_STATE, todo]
        );
    });
    it('测试删除TODO', function () {
        expect(reducers(INIT_STATE, { type: actionTypes.DEL_TODO, id: 2 })).toEqual(
            [{ id: 1, text: '1', completed: false }]
        );
    });
    it('测试切换状态TODO', function () {
        let todo = { id: 3, text: '3', completed: false };
        expect(reducers(INIT_STATE, { type: actionTypes.TOGGLE_TODO, id: 2 })).toEqual(
            [{ id: 1, text: '1', completed: false },
            { id: 2, text: '2', completed: true }]
        );
    });
});