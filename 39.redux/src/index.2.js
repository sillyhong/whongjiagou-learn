

function renderTitle(title) {
    let element = document.querySelector('#title');
    element.innerHTML = title.text;
    element.style.color = title.color;
}
function renderContent(content) {
    let element = document.querySelector('#content');
    element.innerHTML = content.text;
    element.style.color = content.color;
}

const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR';
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR';
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';
//定义一个方法，创建一个仓库，仓库其实是一个对象，只不过可以引用闭包变量
function createStore(reducer, preloadedState) {
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
let initState = {
    title: { color: 'red', text: '标题' },
    content: { color: 'green', text: '内容' }
}
//reduce 处理器。根据老的状态和拿到的动作，返回新的状态 
let reducer = function (state = initState, action) {
    switch (action.type) {
        case UPDATE_TITLE_COLOR:// { type: UPDATE_TITLE_COLOR, color: 'purple' }
            return { ...state, title: { ...state.title, color: action.color } };
        case UPDATE_TITLE_TEXT:// { type: UPDATE_TITLE_TEXT, text: '新标题' }
            return { ...state, title: { ...state.title, text: action.text } };
        case UPDATE_CONTENT_COLOR:// { type: UPDATE_CONTENT_COLOR, color: 'purple' }
            return { ...state, content: { ...state.content, color: action.color } };
        case UPDATE_CONTENT_TEXT:// { type: UPDATE_CONTENT_TEXT, text: '新内容' }
            return { ...state, content: { ...state.content, text: action.text } };
        default:
            return state;
    }
}
let store = createStore(reducer, {
    title: { color: 'red', text: '初始标题' },
    content: { color: 'green', text: '初始内容' }
});
function render() {
    renderTitle(store.getState().title);
    renderContent(store.getState().content);
}
render();
let unsubscribe = store.subscribe(render);
//为了方便action的书写和避免写错，一般我们会写一个函数来生成对应的action
function updateTitleColor(color) {
    return { type: UPDATE_TITLE_COLOR, color };
}
setTimeout(() => {
    store.dispatch();
    unsubscribe(updateTitleColor('orange'));
    store.dispatch({ type: UPDATE_CONTENT_TEXT, text: '新内容' });
}, 1000);
/**
 * 1. 状态是一个类似于全局变量，这样的写法不安全
 * 2. 增加修改的门槛
 * 3. 成功了保护了我们的状态，不能直接外部修改
 * 4. 
 * 
 */