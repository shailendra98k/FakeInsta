import React ,{useState,useEffect, Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Home from './Home'
import SignUp from './SignUp'
import SignIn from './SignIn'
import Profile from './Profile'
import AddImage from './AddImage'

const axios = require('axios');
export const loginInfoContext=React.createContext();

function App( ) 
{

  const [auth, setAuth] = useState(  Number(localStorage.getItem('auth')) );
  const [user, setUser]=useState("");
  const [refresh,setRefresh]=useState(0);
  
  

  const loginInfo={
    auth:auth,
    setAuth:setAuth,
    user:user,
    setUser:setUser,
    refresh:refresh,
    setRefresh:setRefresh
  };
  
  

  useEffect( ()=>{
    if(localStorage.getItem('user')!="") setUser(localStorage.getItem('user'));
    
    console.log("Due to refresh ",refresh);
  });
  
 
  
  
  return (
    <div  >
    
     <loginInfoContext.Provider value={loginInfo}>
         <Router>
            <Switch>
                <Route exact path="/"  render={()=> <Home  />  } />
                {/* <Route exact path="/signIn" render={()=> <SignIn  /> }/>  */}
                <Route exact path="/signIn" component={SignIn} /> 
                <Route exact path="/signUp" render={()=> <SignUp /> }/>
                {/* <Route exact path='/profile' render={()=>(auth?<Profile/>:<SignIn/> )} />}) } }  /> */}
                <Route exact path='/addImage' render={()=><AddImage/>} />
              
            </Switch>
        </Router>
    </loginInfoContext.Provider>
    </div>
  );
}



export default App;

