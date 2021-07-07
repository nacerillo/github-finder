import React, { Component} from "react";
import './App.css';
import Users from "./components/users/Users";
import NavBar from "./components/layout/NavBar";
import axios from "axios";
class App extends Component{
  state = {
    users: [],
    laoding: false
  }
  async componentDidMount(){
    this.setState({loading: true});
    const res = await axios.get('https://api.github.com/users');
    this.setState({users: res.data, loading: false});


  }
  render(){
   
    return (
      <div className="App">
      <NavBar title = "Github Finder" icon = 'fab fa-github'/>
      <div className = "container">
      <Users loading = {this.state.laoding} users = {this.state.users}/>
      </div>
    
      </div>
     
    );
  }

}

export default App;
