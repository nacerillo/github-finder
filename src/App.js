import React, { useState, Fragment} from "react";
import './App.css';
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import Alert from "./components/layout/Alert";
import NavBar from "./components/layout/NavBar";
import About from "./components/pages/About";
import User from "./components/users/User";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
//import context
import GithubState from './context/github/GithubState';


const App = () => {

  //useState hook to handle all geting of user and repos, and loading
  //const [users, setUsers] = useState([]);
  //const [user, setUser] = useState({});
  //const [repos, setRepos] = useState([]);
  //const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  /*state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
    
  }*/

  //set spinner to true until response from api had been retrieved

//moved to context
/*const  clearUsers = () => {
    //this.setState({users: [], loading: false});
    //setUsers([]);
    setLoading(false);
  }*/

  //alert triggers for 5 seconds before disappearing
 const showAlert = (msg, type) => {
   // this.setState({alert: {msg,type}});
   setAlert({msg,type});
    setTimeout(() => setAlert(null), 5000);
  }

  //Get single Github user --moved to context
 /*const getUser = async username => {
    //console.log("working");
   // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Working",res.data);
    //this.setState({user: res.data, loading: false});
    setUser(res.data);
    setLoading(false);
   
  }*/

  // Get users' Repos
/*const  getUserRepos = async username => {
   // console.log("working");
   // this.setState({loading: true});
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log("Working",res.data);
    //this.setState({repos: res.data, loading: false});
    setRepos(res.data);
    setLoading(false);

  }*/

  // const {users, loading,user, repos,alert} = this.state;

    return (
<GithubState>
      <Router>
      <div className="App">
       <NavBar title = "Github Finder" icon = 'fab fa-github'/>
        <div className = "container">
          <Alert alert = {alert}/>
          <Switch>
            <Route exact path= "/" render={props => (
              <Fragment>
                 <Search 

                  setAlert = {showAlert}
                  />
                <Users />
              </Fragment>
            )}/>
            <Route exact path = "/about" component = {About}/>
            <Route exact path = "/user/:login" component = {User}
            />
          </Switch>
 
        </div>
      </div>
      </Router>
      </GithubState>
  
    );
  

}

export default App;
