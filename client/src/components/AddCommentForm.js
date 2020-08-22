import React, { Fragment, useState,useEffect, useContext } from 'react'
import { loginInfoContext } from './App'
import './App.css'
const axios = require('axios');

function Comment(props) {


    const loginInfo = useContext(loginInfoContext);

    const [desc, setDesc] = useState("");
    const onKeyUpHandler = (e) => {
        setDesc(e.target.value);
    }

   useEffect(()=>{
       document.getElementById(`addCommentForm${props.postId}`).value="";
   },[loginInfo.refresh])


    const onClickHandler = (e) => {
        e.preventDefault();
       

        if (desc.length == 0) { alert("Comment cant be emprty!!") }
        else {
            axios.post('http://localhost:5000/comment/add', {
                description: desc,
                user:JSON.parse(localStorage.getItem('userDetails')) ,
                post: props.postId
            })
                .then((res) => {

                    console.log(res);
                    loginInfo.setRefresh(loginInfo.refresh+1);
                })
                .catch((err) => {
                    console.log(err);
                })
            }
    }

    return (
        <Fragment>
           <div style={{display:'flex'}}>
                <br></br>
                <hr />
                <textarea id={`addCommentForm${props.postId}`} placeholder='Add a comment' required={true} onKeyUp={onKeyUpHandler} type='text' style={{ width:'90%', border:'0px', resize:'none'}} />
                <label for={`addCommentForm${props.postId}`}>  <a  href='#' onClick={onClickHandler}>comment </a>  </label>             
 
           </div>

          
           
        </Fragment>
    )
}

export default Comment
