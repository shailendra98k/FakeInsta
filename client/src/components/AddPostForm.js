import React, { Fragment, useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { loginInfoContext } from './App'
const axios = require('axios');

function AddPostForm() {
    const history = useHistory();
    const loginInfo = useContext(loginInfoContext);
    const [desc, setDesc] = useState("");


    const onKeyUpHandler = (e) => {
        setDesc(e.target.value);
    }

    useEffect(()=>{
        document.getElementById('addPostInput').value="";
    },[loginInfo.refresh])
    
    useEffect(()=>{
      console.log("Hi")
    })
    
    const onClickHandler = (e) => {
        e.preventDefault();
        
        if (desc.length == 0) { alert("Post cant be emprty!!") }
        else {
            axios.post('http://localhost:8000/post/add', {
                description: desc,
                user: JSON.parse(localStorage.getItem('userDetails'))
            })
            .then((res) => {
                console.log(res);
                loginInfo.setRefresh(loginInfo.refresh +1 );
                history.push("/")

            })
            .catch((err) => {
                console.log(err);
            })
        }

    }

    return (
        <Fragment>
            <form>
                <textarea id="addPostInput" onKeyUp={onKeyUpHandler} name='description' required={true} type='text' style={{ width: '500px', height: '50px', borderRadius: '5px', margin: '10px', display: 'block' }} placeholder=' Description' />
                <button onClick={onClickHandler} style={{ height: '35px', borderRadius: '5px', margin: '10px' }}>Add Post </button>
            </form>
        </Fragment>

    )
}

export default AddPostForm
