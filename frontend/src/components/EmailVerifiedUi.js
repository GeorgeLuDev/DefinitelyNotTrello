import React from 'react';


function EmailVerifiedUI()
{
    const doEmailVerified = async event =>
    {
        console.log("doEmailVerified called");

        var js = '{"_id":"'+ window.location.pathname.slice(11) + '"}';

        console.log(js);

        try
        {
            const response = await fetch('http://localhost:5000/api/EmailVerification',{method:'PUT',body:js,headers:{'Content-Type': 'application/json'}});

            console.log("calling EmailVerification api");

            var res = JSON.parse(await response.text());

            console.log(res);

            // window.location.href = '/';

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
            <h1>YOUR EMAIL HAS BEEN VERIFIED, ROUTING TO HOME PAGE</h1>
        </div>
    );
};

export default EmailVerifiedUI;
