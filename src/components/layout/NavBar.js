import React from 'react'
import PropTypes from 'prop-types'

 const NavBar = ({icon, title}) =>  {
 
    
        return (
            <nav className = "navbar bg-primary">
               <h1>
                   <i className ={icon}/> {title}
                    </h1>

            </nav>
        );
    
};
   //Default props will be used if no props are passed
   NavBar.defaultProps = {
    title: "Github Finder",
    icon: "fab fa-github"
    };
    //can also set rules for what type the props will be,
    // will throw warning if incrroect type is passed 
    NavBar.propTypes = {
        title: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired
    }

export default NavBar
