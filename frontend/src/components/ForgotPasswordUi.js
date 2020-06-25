import React, { useState } from 'react';

function ForgotPasswordUi()
{

    var loginEmail;

    const [message,setMessage] = useState('');

    const doForgotPassword = async event =>
    {
        event.preventDefault();
        console.log("doForgotPassword called.");

        var js = '{"email":"'+loginEmail.value + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/SentResetPassword',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            
            console.log("Calling the send password reset api");

            var res = JSON.parse(await response.text());

            console.log(res);

            if(res.error != null)
            {
                setMessage(res.error)
            }
        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }

    }

    return (
        <div>
            <h1>Forget password Page</h1>
            <form>
                <label>Email Address</label>
                <input type="text" placeholder="Email" ref={(c) => loginEmail = c}/><br/>
                <input type="submit" onClick={doForgotPassword}/>
                <span id="forgotPasswordResult">{message}</span>
            </form>
        </div>
    )
}

export default ForgotPasswordUi;