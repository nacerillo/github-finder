import React, { Component, Fragment} from "react";
import './App.css';
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import Alert from "./components/layout/Alert";
import NavBar from "./components/layout/NavBar";
import About from "./components/pages/About";
import User from "./components/users/User";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

class App extends Component{
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    
  }
 /* async componentDidMount(){
   // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID, process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  }*/

  //set spinner to true until response from api had been retrieved
  searchUsers = async (text) => {
    //console.log(text);
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log(res.data);
    this.setState({users: res.data.items, loading: false});

  }

  clearUsers = () => {
    this.setState({users: [], loading: false});

  }

  //alert triggers for 5 seconds before disappearing
  setAlert = (msg, type) => {
    this.setState({alert: {msg,type}});
    setTimeout(() => this.setState({alert: null}), 5000);
  }

  //Get single Github user
  getUser = async username => {
    //console.log("working");
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    //console.log("Working",res.data);
    this.setState({user: res.data, loading: false});
  }

  // Get users' Repos
  getUserRepos = async username => {
   // console.log("working");
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Working",res.data);
    this.setState({repos: res.data, loading: false});
  }
  render(){
   const {users, loading,user, repos,alert} = this.state;

    return (
      <Router>
      <div className="App">
       <NavBar title = "Github Finder" icon = 'fab fa-github'/>
        <div className = "container">
          <Alert alert = {alert}/>
          <Switch>
            <Route exact path= "/" render={props => (
              <Fragment>
                 <Search 
                  searchUsers = {this.searchUsers} 
                  clearUsers = {this.clearUsers} 
                  showClear = {users.length > 0 ? true : false}
                  setAlert = {this.setAlert}
                  />
                <Users loading = {loading} users = {users}/>
              </Fragment>
            )}/>
            <Route exact path = "/about" component = {About}/>
            <Route exact path = "/user/:login" render = {props => (
              <User {...props} 
              getUser = {this.getUser}
              getUserRepos = {this.getUserRepos} 
              user = {user} 
              repos = {repos}
              loading = {loading}/>
            )}/>
          </Switch>
 
        </div>
      </div>
      </Router>
     
    );
  }

}

export default App;
