import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

function SignInUi()
{
    var loginEmail;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();
        console.log("doLogin called");

        var js = '{"email":"'+ loginEmail.value + '","password":"' + loginPassword.value +'"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/SignIn',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Sign in api");

            var res = JSON.parse(await response.text());

            console.log(res);

            if (res.id === "-1")
            {
                setMessage("User/Password combination incorrect");
            }
            else if (res.emailVerification === 0)
            {
                setMessage("Please verify your email before signing in");
            }
            else
            {
                var user = 
                {
                    id:res.id,
                    firstName:res.firstName,
                    lastName:res.lastName
                };

                localStorage.setItem('user_data',JSON.stringify(user));

                setMessage("Sign In Successful");
                window.location.href = '/ListOfBoards';
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
            <Form className="signinform">
                <div className="signinlabel">Log in to DNT</div>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control className="signinemail" type="email" placeholder="Enter email" ref={(c) => loginEmail = c}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control className="signinemail" type="password" placeholder="Enter password" ref={(c) => loginPassword = c}/>
                </Form.Group>

                <Button className="signinbutton" variant="primary" type="submit" onClick={doLogin}>
                    Log in
                </Button>
                <span id="loginResult">{message}</span>
                <hr></hr>
                <div className="linktootherpage">
                    <a href="/ForgotPassword">Can't log in?</a>
                    <span class="passwordMenuDivider"></span>
                    <a href="/SignUp" className="link">Sign up for an account</a>
                </div>
            </Form>
            {/* <form>
                <label>Email</label>
                <input type="text" placerholder="Email" ref={(c) => loginEmail = c}/><br/>
                <label>Password</label>
                <input type="text" placerholder="Password" ref={(c) => loginPassword = c}/><br/>
                <input type="submit" onClick={doLogin}/><br/>
                <span id="loginResult">{message}</span>
            </form> */}
        </div>
    );
};

export default SignInUi;
