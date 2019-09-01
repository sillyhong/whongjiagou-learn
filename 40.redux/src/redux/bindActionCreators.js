export default function bindActionCreators(actions,dispatch){
    let newActions = {};
    for(let attr in actions){
     newActions[attr] = function(){
         dispatch(actions[attr].apply(null,arguments));
     }
    }
    return newActions;
 }