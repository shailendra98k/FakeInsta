import React, { Fragment, useState, useContext } from 'react'
import AddCommentForm from './AddCommentForm'
import Comment from './Comment'
import { loginInfoContext } from './App'
import Image from 'react-image-resizer'
import blur from '../assets/img/blur.PNG'

var path = require('path');

const Blur = require('react-blur');

const axios = require('axios');


const dirpath=__dirname+path.join("public/upload");

function Post(props) {

    const loginInfo = useContext(loginInfoContext);
    let Remove;


    const deletePost = function () {

        axios.get(`http://localhost:8000/delete/post/${props.post._id}`)
            .then((res) => {

                loginInfo.setRefresh(loginInfo.refresh + 1);

            })

    }


    if (props.post.user._id === loginInfo.user) {
        Remove = <b> <a onClick={deletePost} href="" style={{ color: 'red', float: 'right' }}>X</a> </b>
    };



    return (
        <Fragment >
            <li style={{ backgroundColor: 'white', margin: '35px', border: '1px solid lightgrey', padding:'3px' }} id={props.post._id} >

                <div style={{ display: 'flex', justifyContent: 'center', width: 'inherit', height: '600px' }}>



                    <div style={{ width: '50%' }}>
                        <img src={` ${path}/${props.post.photos}.jpg`} style={{ maxHeight: '600px', maxWidth: '100%' }} />
                    </div>
                    <div style={{ width: '40%'}}>

                        <div style={{overflow:'auto', height:'550px'}}>
                            {
                                props.post.comments.map((comment) => {
                                    return <Comment comment={comment} />
                                })
                            }

                        </div>

                        <div>
                            <AddCommentForm postId={props.post._id} />
                        </div>

                    </div>


                </div>








            </li>

        </Fragment>

    )
}

export default Post
