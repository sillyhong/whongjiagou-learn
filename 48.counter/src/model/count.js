import key from 'keymaster';
//延迟
let delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok'), ms);
});
export default {
    namespace: 'count',//命名空间,这个字符串决定了此应用在最终状态中的key
    state: {
        record: 0,
        current: 0
    },
    //副作用对象,里面放的都是generator函数
    effects: {
        //effect函数有两个参数 第一个参数是action对象，第二个参数是effetcs,里面可以解析 出来call,put
        //call  用来调用一个方法
        //put 用来派发一个新的action
        *add(action, { call, put }) {
            //yield是表示暂停，如果yield 一个promise,则函数会暂停执行，等promise resolve之后再恢复继续向下执行
            const result = yield call(delay, 1000);
            //put表示派发一个动作，就相当于dispatch({type:'minus'})
            //如果在model里派发动作的话，则不需要加namespace
            yield put({ type: 'minus' });
        }
    },
    //在整 个应用中，只有reducer才能改变 状态 ，其它地方都不可以
    reducers: {
        //这个就是一个reducer函数，state 就是状态 action就是动作
        //reducer是一个纯函数,不能有任何副作用
        //1.相同的输入一定会产生相同的输出 2. 在函数里面不能产出在函数外部可观察到的变化 
        add(state, action) {
            let newCurrent = state.current + 1;
            return { current: newCurrent, record: newCurrent > state.record ? newCurrent : state.record };
        },
        minus(state, action) {
            let newCurrent = state.current - 1;
            return { ...state, current: newCurrent };
        }
    },
    //订阅，
    subscriptions: {
        setup({ history, dispatch }) {
            key('space', function () {
                dispatch({ type: 'add' });
            });
        }
    }
}