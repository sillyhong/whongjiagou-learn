let appState = {
    title: { color: 'red', text: '标题' },
    content: { color: 'green', text: '内容' }
}

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
function renderApp(appState) {
    renderTitle(appState.title);
    renderContent(appState.content);
}
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR';
const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR';
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';
//派发分发的意思
//action 动作 描述一下你想干什么,动作是一个普通的JS对象，只有一个属性是必须的。type,其它属性随意 
function dispatch(action) {
    switch (action.type) {
        case UPDATE_TITLE_COLOR:// { type: UPDATE_TITLE_COLOR, color: 'purple' }
            appState.title.color = action.color;
            break;
        case UPDATE_TITLE_TEXT:// { type: UPDATE_TITLE_TEXT, text: '新标题' }
            appState.title.text = action.text;
            break;
        case UPDATE_CONTENT_COLOR:// { type: UPDATE_CONTENT_COLOR, color: 'purple' }
            appState.content.color = action.color;
            break;
        case UPDATE_CONTENT_TEXT:// { type: UPDATE_CONTENT_TEXT, text: '新内容' }
            appState.content.text = action.text;
            break;
        default:
            throw new Error('你发给我的指令我不认识或无法处理');
    }
}
renderApp(appState);
setTimeout(() => {
    dispatch({ type: UPDATE_TITLE_COLOR, color: 'orange' });
    dispatch({ type: UPDATE_CONTENT_TEXT, text: '新内容' });
    renderApp(appState);
}, 1000);
/**
 * 1. 状态是一个类似于全局变量，这样的写法不安全
 * 2. 增加修改的门槛
 * 
 */