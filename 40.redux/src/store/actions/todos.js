import * as types from '../action-types';
//actionCreator 创建action的函数
export default {
    addTodo(text){
        return {type:types.ADD_TODO,text}
    },
    delTodo(index){
        return {type:types.DEL_TODO,index}
    },
    toggleTodo(index){
        return {type:types.TOGGLE_TODO,index}
    },
    switchType(newType){
        return {type:types.SWITCH_TYPE,newType}
    }
}