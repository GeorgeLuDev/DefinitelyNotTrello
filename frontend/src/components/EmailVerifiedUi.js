import React from 'react';
import { Form } from 'react-bootstrap';

function EmailVerifiedUI()
{
    const doEmailVerified = async event =>
    {
        console.log("doEmailVerified called");

        var js = '{"_id":"'+ window.location.pathname.slice(-24) + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/EmailVerification',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling EmailVerification api");

            var res = JSON.parse(await response.text());

            console.log(res);

            setTimeout(() => {
                window.location.href = '/SignIn';
              }, 3000);
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
                <div className="signinlabel">Email Verified</div>
                <div className="signinlabel">Returning to home page</div>
            </Form>
        </div>
    );
};

export default EmailVerifiedUI;
