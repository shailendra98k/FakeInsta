import React, { useState, useEffect, useContext, Fragment } from 'react';
import { loginInfoContext } from './App'
import Post from './Post'
import $ from 'jquery';
import './App.css'
import Friends from './Friends'
import Guest from './Guest'
import Header from './Header'
const axios = require('axios');


function Home() {
    
    const [posts, setPosts] = useState([]);
    const props = useContext(loginInfoContext);

    console.log(posts); 
    useEffect(() => {
        if (props.auth) axios.get(`http://localhost:8000/user/${JSON.parse(localStorage.getItem('userDetails'))._id}/posts`)
            .then((res) => {
                setPosts(res.data)     
            })
            .catch((err) => {
                console.log(err);
            }) 
            
    },[props.refresh])
    
    useEffect(()=>{
        
    })
    

    const srcCode = <div id='home'>

      
        <div id='container' style={{  paddingTop:70}}>

            <div id='feeds' style={{ width: '100%', height: '800px' }}>
                <div id='post-container'>
                    <ul id='post-container-list'>

                        {
                            posts.map((post) => {
                                return <Post key={post.id} post={post}/> 
                            })
                        }

                    </ul>
                </div>
            </div>
            
        </div>

    </div>
    
   if(props.auth==0) return <Guest/>
   
   
    return (
        
        
         
       
       <div> 
            <Header/>
            {srcCode} 
        </div>
    );
}

export default Home;

