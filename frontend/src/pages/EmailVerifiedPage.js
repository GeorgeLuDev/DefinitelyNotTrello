import React from 'react';

import Header from '../components/Header';
import EmailVerifiedUi from '../components/EmailVerifiedUi';

const EmailVerifiedPage = () =>
{
    return(
        <div>
            <Header />
            <h1>Email Verified Page</h1>
            <EmailVerifiedUi components={EmailVerifiedUi}/>
        </div>
    );
}

export default EmailVerifiedPage;
