import React, { useEffect, useState } from 'react'
import { loginInfoContext } from './App'
import './App.css'
import Post from './Post'
import AddPostForm from './AddPostForm'
import Friends from './Friends'
import Header from './Header'

const axios = require('axios');


function Profile() {

    const loginInfo = React.useContext(loginInfoContext);
    const [posts, setPosts] = useState([]);

    const url = `http://localhost:5000/user/post/get`;
    useEffect(() => {
        console.log("In Profile Effect")
        axios.get(url)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [loginInfo.refresh])

    return (
        <React.Fragment>
            <Header/>
            Profile Page


        </React.Fragment>
    )
}


export default Profile
