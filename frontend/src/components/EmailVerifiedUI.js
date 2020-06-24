import React from 'react';


function EmailVerifiedUI()
{

    return(
        <div>
            <h1>YOUR EMAIL HAS BEEN VERIFIED, ROUTING TO HOME PAGE</h1>
            <h1>{window.location.pathname.slice(19)}</h1>
        </div>
    );
};

export default EmailVerifiedUI;
