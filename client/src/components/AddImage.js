import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import Cropper from 'cropperjs';
import $ from 'jquery'
import 'cropperjs/dist/cropper.css'
import { loginInfoContext } from './App'
import Header from './Header'
const axios = require('axios')


const image = document.getElementById('image');






function AddImage() {

    const loginInfo = React.useContext(loginInfoContext);
    const [filename, setFilename] = React.useState("Choose File")
    const [file, setFile] = React.useState('')

    var cropper;
    const onChangeHandler = (e) => {

        var file = e.target.files[0];
        $('#file-browse').text(file.name)
        $("#image").attr("src", window.URL.createObjectURL(file));
        var image = document.getElementById('image');
        cropper = new Cropper(image, {

            cropBoxResizable: false,
            viewMode: 3,
            aspectRatio: 1,
            autoCropArea: 1,
            toggleDragModeOnDblclick: false,
            movable: true
        })
        console.log("cropper", cropper)
    }


    const onClickHandler = (e) => {

        console.log("cropper after submit", cropper)
        cropper.crop();
        cropper.getCroppedCanvas().toBlob((blob) => {
            const formdata = new FormData();
            formdata.append("image", blob);


            axios.post('http://localhost:8000/post/image/add', formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log("Response", res)

                axios.post('http://localhost:8000/post/add', {

                    user: JSON.parse(localStorage.getItem('userDetails')),
                    photos: res.data.filename


                })
                    .then((res) => {
                        console.log(res);
                        loginInfo.setRefresh(loginInfo.refresh + 1);

                    })
                    .catch((err) => {
                        console.log(err);
                    })




            }).catch((err) => {
                console.log("error in uploading", err)
            })

        })

    }

    const RotateHnadler = (e) => {
        cropper.rotate(90);
    }


    return (
        <div >

            <Header />
            <div  style={{ marginTop: '80px', padding:'0px 20px 0px 20px' }}>
                <form  >
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" onChange={onChangeHandler} />
                        <label id='file-browse' className="custom-file-label" for="inputGroupFile01">{filename}</label>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div >

                            <img id='image' style={{ maxWidth: '900px', maxHeight: '500px' }} />

                        </div>
                    </div>



                    {/* <button type="submit"  class="btn btn-primary btn-lg mt-4 btn-block">Upload</button>
                <button type="button"  class="btn btn-primary btn-lg mt-4 btn-block">Upload</button> */}
                    <input id='btn' type='button' onClick={onClickHandler} value="Upload" />
                    <input id='btn' type='button' onClick={RotateHnadler} value="Rotate" />

                </form>



            </div>


        </div>
    )
}

export default AddImage




