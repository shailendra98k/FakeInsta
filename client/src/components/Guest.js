import React from 'react'
import InstagramDemoPic from '../assets/img/InstagramDemoPic.png'
import SignIn from './SignIn'


function Guest() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'30px' }}>
            <div style={{ display: 'flex' }} >
                <img style={{}} src={InstagramDemoPic} />

                <div>
                    <SignIn />
                    <div style={{margin:'5%', padding:'0 20px 0 20px', border:'1px solid lightgrey', backgroundColor:'white'}}>
                       <p style={{color:'darkgrey'}} >Don't have an account? <a href='/signUp' style={{color:'#0095f6'}}>Sign Up</a> </p>
                   </div>

                </div>


            </div>



        </div>

    )
}

export default Guest
