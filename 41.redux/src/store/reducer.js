import * as types from './action-types';
export default function(state={number:0},action){
  switch(action.type){
      case types.INCREMENT:
        return {number:state.number+action.payload};
      default:
        return state;  
  }
}