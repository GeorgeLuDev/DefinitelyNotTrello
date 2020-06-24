import React, { useState } from 'react';

function ForgotPasswordUI()
{

    var loginEmail;

    const [message,setMessage] = useState('');

    const doForgotPassword = async event =>
    {
        event.preventDefault();
        console.log("doForgotPassword called.");

        var js = '{"email":"'+loginEmail.value + '"}';

    }

    return (
        <div>
            <h1>Reset your password here</h1>
            <form>
                <label>Email Address</label>
                <input type="text" placeholder="Email" ref={(c) => loginEmail = c}/><br/>
                <input type="submit" onClick={doForgotPassword}/>
                <span id="forgotPasswordResult">{message}</span>
            </form>
        </div>
    )
}

export default ForgotPasswordUI;