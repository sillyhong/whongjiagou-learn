import {createStore,applyMiddleware,compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware  from 'redux-saga';
import {rootSaga} from '../sagas';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
let history = createHistory();
let middlewareRouter = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//let store = createStore(reducers);
//let store = applyMiddleware()(createStore)(reducers);
//这是一个可以帮你运行saga的中间件
let sagaMiddleware = createSagaMiddleware();
let store = createStore(reducers,composeEnhancers(applyMiddleware(sagaMiddleware,middlewareRouter)));
//通过中间件执行或者说运行saga
sagaMiddleware.run(rootSaga,store);
window.store = store;
export default store;