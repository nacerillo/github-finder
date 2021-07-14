import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types'

const Search = ({searchUsers, showClear, clearUsers, setAlert} ) => {
    //replacing props with useStateHooks
    const [text, setText] = useState();
    useEffect(() => {
        clearUsers();
     }, []);
    
    const onSubmit = (e) =>{
        e.preventDefault();
        if(text === ''){
            setAlert('No Input Given', 'light')
        } else {
            searchUsers(text);
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
                {showClear && (
                    <button 
                        className = "btn btn-light btn-block" 
                        onClick = {clearUsers}>
                        Clear
                        </button>
                  )}
            </div>
        );
    }

Search.propTypes = {
    clearUsers: PropTypes.func.isRequired,
    showClear:  PropTypes.bool.isRequired,
    searchUsers: PropTypes.func.isRequired,
    setAlert : PropTypes.func.isRequired 
};
export default Search;
