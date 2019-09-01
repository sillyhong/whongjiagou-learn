import * as types from '../action-types';
import {combineReducers} from 'redux';
import {routerReducer } from 'react-router-redux'
function user(state = {token:'',error:''}, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return { ...state,token:action.token};
        case types.LOGIN_ERROR:
            return { ...state,error:action.error};
        default:
            return state;
    }
}
export default combineReducers({
    user,
    router: routerReducer
});