import React ,{useState,useEffect, Component} from 'react';
import {Redirect} from 'react-router-dom'
import {loginInfoContext} from './App'
import './App.css';


const axios=require('axios');



function SignUp() {
  
  const props=React.useContext(loginInfoContext);
  const [re, setRedirect] = useState(0);

  console.log('In Sign Up')

  // useEffect( ()=>("In signUp UseEfect") )

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const passwordKeyPressHandler = function (e) {
    console.log(e.target.value);
    setPassword(e.target.value);
  }
  const usernameKeyPressHandler = function (e) {
    console.log(e.target.value);
    setUsername(e.target.value);
  }

  
  const onClickHandler=function (e){
  e.preventDefault();
  

  axios.post('http://localhost:8000/user/signUp',{
    username: username,
    password: password

  }).then( (res)=>{
     if(res.data.statusCode==200)
     {
       console.log("User Created");
       console.log("Redirect", re);
       setRedirect(1);
       console.log("Redirect", re)
     }
     else
     {
       console.log("User Exist");
     } 
 
  }).catch( (err)=>console.log(err))

}
  
  if(re) return <Redirect to='/signIn' />
  if(props.auth==1) return <Redirect to='/' />
  return (
    <div >
      <div style={{display:'flex',justifyContent:'center', marginTop:'5%' }}>

          <form >
              <h1 style={{textAlign:'center'}} >Sign Up</h1>
              <input style={{padding:'15px',display:'block',width:'200%', marginTop:'15px'}}  type='text' name='username' onKeyUp={usernameKeyPressHandler} />
              <input  style={{padding:'15px',display:'block',width:'200%',marginTop:'15px'}} name='password' type='password' onKeyUp={passwordKeyPressHandler} />
              <input  style={{padding:'15px'}} type='checkbox'  name='rememberMe' />
              <label > <small>  Remember Me  </small></label>
              <input style={{padding:'15px',display:'block',width:'220%',marginTop:'15px'}}  type='submit' onClick={onClickHandler}/>
          </form>
      </div>

    </div>
  );
}

export default SignUp;
