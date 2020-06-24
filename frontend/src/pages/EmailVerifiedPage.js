import React from 'react';

import Header from '../components/Header';
import EmailVerifiedUI from '../components/EmailVerifiedUI';

const EmailVerifiedPage = () =>
{
    return(
        <div>
            <Header />
            <h1>Email Verified Page</h1>
            <EmailVerifiedUI components={EmailVerifiedUI}/>
        </div>
    );
}

export default EmailVerifiedPage;
