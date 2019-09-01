import * as types from '../action-types';
export default function(state={items:[],newType:'all'},action){
    switch(action.type){
        case types.ADD_TODO://{type:ADD_TODO,text}
            return {...state,items:[...state.items,{text:action.text,completed:false}]};
        case types.DEL_TODO:
            return {...state,items:[...state.items.slice(0,action.index),...state.items.slice(action.index+1)]};
        case types.TOGGLE_TODO:
            return {...state,items:state.items.map((item,index)=>{
                if(index === action.index){
                    item.completed = !item.completed;//状态取反
                }
                return item;
            })};
        case types.SWITCH_TYPE:
            return {...state,newType:action.newType};
        default:
             return state;    
    }
}