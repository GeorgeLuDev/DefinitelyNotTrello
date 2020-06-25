import React, { useState } from 'react';

function UpdatePasswordUi()
{
    var loginPassword;

    const [message, setMessage] = useState('');

    const doUpdatePassword = async event =>
    {
        event.preventDefault();
        console.log("doResetPassword called.");

        console.log(window.location.pathname.slice(15));
        var js = '{"_id":"'+window.location.pathname.slice(16)+'","password":"'+loginPassword.value+'"}';


        console.log(js);
        try
        {
            const response = await fetch('http://localhost:5000/api/UpdatePassword',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

        }
        catch(e)
        {

        }
    }

    return(
        <div>
            <h1>Update Password Happening Now.</h1>
            <form>
                <label>New Password</label>
                <input type="text" placerholder="New Password" ref={(c) => loginPassword = c}/><br/>
                <input type="submit" onClick={doUpdatePassword}/>
                <span id="updatePasswordResult">{message}</span>
            </form>
        </div>
    )
}

export default UpdatePasswordUi;