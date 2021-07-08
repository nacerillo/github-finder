import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
        
    }
    static propTypes = {
        clearUsers: PropTypes.func.isRequired,
        showClear:  PropTypes.bool.isRequired,
        searchUsers: PropTypes.func.isRequired 
    }
    onSubmit = (e) =>{
        e.preventDefault();
        if(this.state.text === ''){
            this.props.setAlert('No Input Given', 'light')
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({text: ''})
        }
    }
    onChange = (e) => {
        this.setState({text: e.target.value})
    }
    render() {
        const {showClear, clearUsers} = this.props;
        return (
            <div>
                <form onSubmit = {this.onSubmit} className = "form">
                    <input type = "text" name = "text" placeholder = "Search Users..." value = {this.state.text} onChange = {this.onChange}/>
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
        )
    }
}

export default Search
