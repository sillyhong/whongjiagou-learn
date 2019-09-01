import {combineReducers} from '../../redux';
import counter from './counter';
import todos from './todos';
/**
 * {
 * counter:{number:0}
 * todos:{items:[]}
 * }
 */
export default combineReducers({
    counter,
    todos
});