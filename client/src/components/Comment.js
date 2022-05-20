import React,{useContext} from 'react'
import { loginInfoContext } from './App'
import axios from 'axios'


function Comment(props) {

    var user = props.comment.user;
    
    
    const loginInfo = useContext(loginInfoContext);

    const deleteComment=function(){
     
        axios.get(`http://localhost:8000/delete/comment/${props.comment._id}`)
        .then((res)=>{
             loginInfo.setRefresh(loginInfo.refresh+1);
        })

    }

    var Remove;

    if(user._id==loginInfo.user)
    {
        Remove=<b> <a onClick={deleteComment} href='#' style={{color:'lightgrey', float:'right'}}>...</a> </b>
    };


    return (
        <li id={[props.comment._id]} >

            <b> {user.username} : </b>
            <div style={{wordWrap:'break-word'}}> 
            <span >{props.comment.description}  </span>
            </div>
            
      
        </li>
    )
}

export default Comment
