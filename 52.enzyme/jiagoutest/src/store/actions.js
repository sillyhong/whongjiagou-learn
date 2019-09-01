let actionTypes = require('./action-types');
export default {
    addTodo(text) {
        let todo = { text };
        return { type: actionTypes.ADD_TODO, todo };
    },
    delTodo(id) {
        return { type: actionTypes.DEL_TODO, id };
    },
    toggleTodo(id) {
        return { type: actionTypes.TOGGLE_TODO, id };
    }
}