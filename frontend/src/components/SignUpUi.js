import React, { useState } from 'react';


function SignInUi()
{
    var loginfirstName;
    var loginlastName;
    var loginEmail;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doSignUp = async event =>
    {
        event.preventDefault();
        console.log("doSignUp called");

        var js = '{"firstName":"'+ loginfirstName.value + '","lastName":"'+ loginlastName.value + '","email":"'+ loginEmail.value + '","password":"' + loginPassword.value +'"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/SignUp',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Sign Up api");

            var res = JSON.parse(await response.text());

            console.log(res);
            if (res.error == "")
            {
                setMessage("Sign Up Successful");
            }
            else
            {
                setMessage(res.error);
            }

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
    }

    return(
        <div>  
            <h1>This is the Sign Up page</h1>
            <form>
                <label>First Name</label>
                <input type="text" placerholder="Email" ref={(c) => loginfirstName = c}/><br/>
                <label>Last Name</label>
                <input type="text" placerholder="Email" ref={(c) => loginlastName = c}/><br/>
                <label>Email</label>
                <input type="text" placerholder="Email" ref={(c) => loginEmail = c}/><br/>
                <label>Password</label>
                <input type="text" placerholder="Password" ref={(c) => loginPassword = c}/><br/>
                <input type="submit" onClick={doSignUp}/><br/>
                <span id="loginResult">{message}</span>
            </form>
        </div>
    );
};

export default SignInUi;
