import React, { useReducer} from 'react';
import axios  from 'axios';
import GithubContext from './GithubContext';
import GithubReducer from './GithubReducer';

import { createContext } from "react";



import {
SEARCH_USERS,
SET_LOADING,
CLEAR_USERS,
GET_REPOS,
GET_USERS
} from '../types';
//const GithubContext = createContext();
const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }
 const [state, dispatch] = useReducer(GithubReducer, initialState);

 //Search Users
 const searchUsers = async (text) => {
    //this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    //setUsers(res.data.items);
    dispatch({
        type: SEARCH_USERS,
        payload: res.data.items
    });
};
 //Get Users/

 //GET repos

 //set loading
const setLoading = () => dispatch({type: SET_LOADING});
 //clear users

 const  clearUsers = () => dispatch({type: CLEAR_USERS});

 return (
 <GithubContext.Provider    
    value={{
      users: state.users,
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers
    }}>
     {props.children}
 </GithubContext.Provider>);
}

export default GithubState;
