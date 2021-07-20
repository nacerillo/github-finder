import React, {useState, useContext} from 'react';
import PropTypes from 'prop-types'
import GithubContext from '../../context/github/GithubContext';
import GithubState from '../../context/github/GithubState';
const Search = ({ setAlert} ) => {
    //replacing props with useStateHooks
    const githubContext = useContext(GithubContext);
    const [text, setText] = useState();

    
    
    const onSubmit = (e) =>{
        e.preventDefault();
        if(text === ''){
            setAlert('No Input Given', 'light')
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
    };
    const onChange = (e) => setText(e.target.value);
   
        //const {showClear, clearUsers} = this.props;
        return (
            <div>
                <form onSubmit = {onSubmit} className = "form">
                    <input type = "text" name = "text" placeholder = "Search Users..." value = {text} onChange = {onChange}/>
                    <input type = "submit" value = "Search" className = "btn btn-dark btn-block"/>
                </form>
                {githubContext.users.length > 0 && (
                    <button 
                        className = "btn btn-light btn-block" 
                        onClick = {githubContext.clearUsers}>
                        Clear
                        </button>
                  )}
            </div>
        );
    }

Search.propTypes = {
  
    showClear:  PropTypes.bool.isRequired,
    setAlert : PropTypes.func.isRequired 
};
export default Search;
