import React from 'react';
import { Form } from 'react-bootstrap';

function EmailVerifiedUI()
{
    const doEmailVerified = async event =>
    {
        // console.log("doEmailVerified called");

        var js = '{"_id":"'+ window.location.pathname.slice(-24) + '"}';
        
        // console.log(js);

        try
        {
            // console.log((process.env.REACT_APP_URL + 'EmailVerification'));

            const response = await fetch(process.env.REACT_APP_URL + 'EmailVerification',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            // console.log("calling EmailVerification api");

            var res = JSON.parse(await response.text());

            // console.log(res);

            // console.log(res.result.n);

            if (res.result.n === 1)
            {
                document.getElementById("emailverified result1").innerText = "Email Verified";
                document.getElementById("emailverified result2").innerText = "Returning to home page";
                setTimeout(() => {
                    window.location.href = '/SignIn';
                  }, 1500);
            }
            else
            {
                document.getElementById("emailverified result1").innerText = "Something went wrong";
                document.getElementById("emailverified result2").innerText = "Please try sending an email again";
                setTimeout(() => {
                    window.location.href = '/ForgotPassword';
                  }, 1500);
            }

        }
        catch(e)
        {
            console.log("there was an error");
            console.log(e.toString());
            return;
        }
    }
    doEmailVerified();
    return(
        <div>
            <Form className="signinform">
                <div id="emailverified result1" className="signinlabel"></div>
                <div id="emailverified result2" className="signinlabel"></div>
            </Form>
        </div>
    );
};

export default EmailVerifiedUI;
