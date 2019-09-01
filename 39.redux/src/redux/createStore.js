export default function (reducer, preloadedState) {
    let state = preloadedState;
    let listeners = [];
    function getState() {
        // return state;
        return JSON.parse(JSON.stringify(state));
    }
    //派发分发的意思
    //action 动作 描述一下你想干什么,动作是一个普通的JS对象，只有一个属性是必须的。type,其它属性随意 
    function dispatch(action) {
        //接收新的动作后，通过 才状态 和新动作计算出新状态
        state = reducer(state, action);
        //然后通过所有的监听函数执行
        listeners.forEach(listener => listener());
    }
    //派发了一个动作获取初始值，其实在redux内部是派发一个INIT: '@@redux/INIT'动作
    dispatch({ type: '@@redux/INIT' });
    //订阅，供外界订阅本仓库中状态的变化 ，如果状态 变化 了会执行订阅的逻辑 
    function subscribe(listener) {
        listeners.push(listener);
        //返回一个取消订阅函数
        return function () {
            listeners = listeners.filter(item => item != listener)
        }
    }
    return {
        getState, dispatch, subscribe
    }
}