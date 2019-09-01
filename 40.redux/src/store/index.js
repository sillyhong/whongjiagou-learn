import {createStore} from '../redux';
import reducers from './reducers';
let store = createStore(reducers);
//把store挂载在全局对象上以方便在控制台里可以获得状态和派发动作
window.store = store;
export default store;