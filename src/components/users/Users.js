import React, { useContext} from 'react';
import UserItem from './UserItem';
import Spinner from "../layout/Spinner";
import GithubContext from '../../context/github/GithubContext';
 const Users = () => {
     const githubContext = useContext(GithubContext);

     const {users, loading} = githubContext;
if(loading) {
    console.log("goodbye")
    return (<Spinner/>);
}
else  {
    console.log("hello");
    return (
        <div style ={userStyle} >
           { users.map(user => (
               <UserItem key = {user.id} user = {user}/>
           ))}
        </div>
    );
}
        
    
}
//users not coming from props anymore. coming from context
/*Users.protoTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}*/ 
const userStyle = {
    display: 'grid',
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem"
}

export default Users
