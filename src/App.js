import React, { useState, Fragment} from "react";
import './App.css';
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import Alert from "./components/layout/Alert";
import NavBar from "./components/layout/NavBar";
import About from "./components/pages/About";
import User from "./components/users/User";
import axios from "axios";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

const App = () => {

  //useState hook to handle all geting of user and repos, and loading
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /*state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    
  }*/
 /* async componentDidMount(){
   // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID, process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({loading: true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  }*/

  //set spinner to true until response from api had been retrieved
 const searchUsers = async (text) => {
    //this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    //this.setState({users: res.data.items, loading: false});
    setUsers(res.data.items);
    setLoading(false);
  }

const  clearUsers = () => {
    //this.setState({users: [], loading: false});
    //setUsers([]);
    setLoading(false);
  }

  //alert triggers for 5 seconds before disappearing
 const showAlert = (msg, type) => {
   // this.setState({alert: {msg,type}});
   setAlert({msg,type});
    setTimeout(() => setAlert(null), 5000);
  }

  //Get single Github user
 const getUser = async username => {
    //console.log("working");
   // this.setState({loading: true});
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Working",res.data);
    //this.setState({user: res.data, loading: false});
    setUser(res.data);
    setLoading(false);
   
  }

  // Get users' Repos
const  getUserRepos = async username => {
   // console.log("working");
   // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Working",res.data);
    //this.setState({repos: res.data, loading: false});
    setRepos(res.data);
    setLoading(false);

  }

  // const {users, loading,user, repos,alert} = this.state;

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
                  searchUsers = {searchUsers} 
                  clearUsers = {clearUsers} 
                  showClear = {users.length > 0 ? true : false}
                  setAlert = {showAlert}
                  />
                <Users loading = {loading} users = {users}/>
              </Fragment>
            )}/>
            <Route exact path = "/about" component = {About}/>
            <Route exact path = "/user/:login" render = {props => (
              <User {...props} 
              getUser = {getUser}
              getUserRepos = {getUserRepos} 
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

export default App;
