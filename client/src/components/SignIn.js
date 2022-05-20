import React, { useState, useEffect } from 'react';
import { Redirect, Route, useHistory, Link, BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import { loginInfoContext } from './App'
const axios = require('axios');

function SignIn() {

  const loginInfo = React.useContext(loginInfoContext);
  const [redirect, setredirect] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log("In SignIn")
  
  const signInUser = (user) => {
    
    loginInfo.setAuth(1);
    loginInfo.setUser(user.username);
    localStorage.setItem('auth', 1);
    localStorage.setItem('user', user._id);
    localStorage.setItem('userDetails',JSON.stringify(user))
  
   
  }
  const passwordKeyPressHandler = function (e) {
    console.log(e.target.value);
    setPassword(e.target.value);
  }
  const usernameKeyPressHandler = function (e) {
    console.log(e.target.value);
    setUsername(e.target.value);
  }
  const onClickHandler = function (e) {

    e.preventDefault();

    axios.post('http://localhost:8000/user/signIn', {
      username: username,
      password: password
    })
      .then((res) => {
        console.log(res);
        if (res.data.statusCode == 200) {
          setredirect(true);
          signInUser(res.data.data);
          loginInfo.setRefresh(loginInfo.refresh +1 );
        } 
        else {
          console.log("Wrong ID or password", res.data);
        }
      })
      .catch((err) => {
        console.log("Error in siging in...", err)
      })
  }
  
  if (redirect){

    
    return <Redirect to='/' />

  } 
  if(loginInfo.auth==1) return <Redirect to='/' />

  return (

    <div >

      <div style={{ display: 'flex',flexDirection:'row',  justifyContent: 'center', margin: '5%', padding:'0 20px 30px 20px',border:'1px solid lightgrey', width:'inherit' , backgroundColor:'white'}}>
        

        <form style={{width:'300px',  padding:'30px'}} >
          <h1 style={{ fontFamily:'cursive' }} >Fake Instagram</h1>


          <input style={{ padding: '5px', display: 'block', width: '100%', marginTop: '15px', height:'30px',border:'1px solid lightgrey' }} type='text' name='username' onKeyUp={usernameKeyPressHandler} />

          <input style={{ padding: '5px', display: 'block', width: '100%', marginTop: '15px', height:'30px',border:'1px solid lightgrey'  }} name='password' type='password' onKeyUp={passwordKeyPressHandler} />

          <input style={{ padding: '15px' }} type='checkbox' name='rememberMe' />
          <label  > <small>  Remember Me  </small></label>
          
          <input style={{ display: 'block', width: '103%', height:'30px', backgroundColor:'#b2dffc' , border:'1px solid lightgrey', marginTop: '15px'}} type='submit' value="Log in" onClick={onClickHandler} />
         
          
        </form>

     


      </div>

    </div>
  );
}

export default SignIn;
