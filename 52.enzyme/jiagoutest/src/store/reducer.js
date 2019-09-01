import { WSAETIMEDOUT } from 'constants';

let INIT_STATE = [
    { id: 1, text: '1', completed: false },
    { id: 2, text: '2', completed: false }
]
let actionTypes = require('./action-types');
export default function (state = INIT_STATE, action) {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            let todo = action.todo;
            todo.completed = false;
            todo.id = state.length ? state[state.length - 1].id + 1 : 1;
            return [...state, todo];
        case actionTypes.DEL_TODO:
            return state.filter(item => item.id != action.id);
        case actionTypes.TOGGLE_TODO:
            return state.map(item => {
                if (item.id == action.id) {
                    item.completed = !item.completed;
                }
                return item;
            });
        default:
            return state;
    }
}