import compose from './compose';
export default function(...middlewares){//middleware 是应用的中间件  createStore用来创建仓库 reducer
    return function (createStore){
        return function(reducer){
            let store = createStore(reducer);
            let dispatch;
            let middlewareAPI = {
                getState:store.getState,
                dispatch:action=>dispatch(action)
            }
            middlewares = middlewares.map(middleware=>middleware(middlewareAPI));
            dispatch = compose(...middlewares)(store.dispatch);
            return {...store,dispatch};
        }
    }
}