import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

function ForgotPasswordUi()
{

    var loginEmail;

    const [message,setMessage] = useState('');

    const doForgotPassword = async event =>
    {
        event.preventDefault();
        // console.log("doForgotPassword called.");

        var js = '{"email":"'+loginEmail.value + '"}';

        // console.log(js);

        try
        {
            const response = await fetch(process.env.REACT_APP_URL + 'SentResetPassword',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            
            // console.log("Calling the send password reset api");

            var res = JSON.parse(await response.text());

            // console.log(res);

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
            {/* <h1>Forget password Page</h1> */}
            {/* <form>
                <label>Email Address</label>
                <input type="text" placeholder="Email" ref={(c) => loginEmail = c}/><br/>
                <input type="submit" onClick={doForgotPassword}/>
                <span id="forgotPasswordResult">{message}</span>
            </form> */}
            
            <Form className="signinform">
                <div className="signinlabel">Can't Log in?</div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className="signinemail" type="email" placeholder="Enter email" ref={(c) => loginEmail = c}/>
                </Form.Group>

                <Button className="signinbutton" variant="primary" type="submit" onClick={doForgotPassword}>
                    Send recovery link
                </Button>
                <span id="forgotPasswordResult">{message}</span>
                <hr></hr>
                <div className="linktootherpage">
                    <a href="/SignIn">Remember your Password? Return to Log in</a>
                </div>
            </Form>

        </div>
    )
}

export default ForgotPasswordUi;
