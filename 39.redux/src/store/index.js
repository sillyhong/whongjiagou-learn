import { createStore } from '../redux';
import reducers from './reducers';
let store = createStore(reducers);
window.store = store;
export default store;