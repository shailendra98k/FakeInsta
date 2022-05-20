import React from 'react'
import { loginInfoContext } from './App'
const axios =require('axios')

function Friends(){
    
    const loginInfo = React.useContext(loginInfoContext);
    const [users,setUsers]=React.useState([]);
     
    React.useEffect( ()=>{
    axios.get('http://localhost:8000/user/get')
    .then((users)=>{
        console.log("User Received", users);
        setUsers( users.data);
    })},[])
    
    if(loginInfo.auth==0) return <div></div>

    return (
        <div>
            <h1>Active Friends</h1>
            {
                users.map((user)=>{
                    if(user._id==loginInfo.user);
                    else return   <a href="" > <li> <h3>  {user.username} </h3>  </li>  </a>  
                })
            }
        </div>
    )
}

export default Friends
