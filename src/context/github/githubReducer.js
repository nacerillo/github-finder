// Reducer determines what is going to happen to your state based on your actions
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_REPOS,
    GET_USERS
    } from '../types';

export default (state,action) => {
    switch(action.type){
        case SEARCH_USERS:
            return {...state,users: action.payload,loading: false};
        case SET_LOADING:
            return {...state,loading: true}
        case CLEAR_USERS:
            return {...state,users: [], loading: false}
        default: 
            return state
    }
}