import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';

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
            const response = await fetch(process.env.REACT_APP_URL + 'SignUp',{method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling Sign Up api");

            var res = JSON.parse(await response.text());

            console.log(res);
            if (res.error === "")
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
            {/* <h1>This is the Sign Up page</h1>
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
            </form> */}

            <Form className="signinform">
                <div className="signinlabel">Sign up for your account</div>

                <Form.Group controlId="formBasicName">
                    <Form.Control className="signinemail" type="text" placeholder="Enter First Name" ref={(c) => loginfirstName = c}/>
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Control className="signinemail" type="text" placeholder="Enter Last Name" ref={(c) => loginlastName = c}/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Control className="signinemail" type="email" placeholder="Enter email" ref={(c) => loginEmail = c}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control className="signinemail" type="password" placeholder="Enter password" ref={(c) => loginPassword = c}/>
                </Form.Group>

                <Button className="signinbutton" variant="primary" type="submit" onClick={doSignUp}>
                    Log in
                </Button>
                <span id="loginResult">{message}</span>
                <hr></hr>
                <div className="linktootherpage">
                    <a href="/SignIn" className="link">Already have an account? Log in</a>
                </div>
            </Form>
        </div>
    );
};

export default SignInUi;
