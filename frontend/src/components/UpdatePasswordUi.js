import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

function UpdatePasswordUi()
{
    var loginPassword;

    const [message, setMessage] = useState('');

    const doUpdatePassword = async event =>
    {
        event.preventDefault();
        console.log("doResetPassword called.");

        console.log(window.location.pathname.slice(-24));
        var js = '{"_id":"'+window.location.pathname.slice(-24)+'","password":"'+loginPassword.value+'"}';


        console.log(js);
        try
        {
            const response = await fetch('http://localhost:5000/api/UpdatePassword',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling UpdatePassword api");

            var res = JSON.parse(await response.text());

            console.log(res);

            if (res.error === "")
            {
                setMessage("Reset Password Successful, redirting to sign in");
            }
            else
            {
                setMessage("Reset Password Unsuccessful, redirting to sign in");
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
            {/* <h1>Update Password Happening Now.</h1>
            <form>
                <label>New Password</label>
                <input type="text" placerholder="New Password" ref={(c) => loginPassword = c}/><br/>
                <input type="submit" onClick={doUpdatePassword}/>
                <span id="updatePasswordResult">{message}</span>
            </form> */}
            <Form className="signinform">
                <div className="signinlabel">Reset your password</div>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control className="signinemail" type="password" placeholder="Enter password" ref={(c) => loginPassword = c}/>
                </Form.Group>

                <Button className="signinbutton" variant="primary" type="submit" onClick={doUpdatePassword}>
                    Reset Password
                </Button>
                <span id="updatePasswordResult">{message}</span>
                <hr></hr>
                <div className="linktootherpage">
                    <a href="/SignIn">Remember your password? Log in</a>
                </div>
            </Form>
        </div>
    )
}

export default UpdatePasswordUi;