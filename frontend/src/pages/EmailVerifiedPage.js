import React from 'react';

import NavBarUi from '../components/NavBarUi';
import EmailVerifiedUi from '../components/EmailVerifiedUi';

const EmailVerifiedPage = () =>
{
    return(
        <div>
            <NavBarUi />
            <EmailVerifiedUi components={EmailVerifiedUi}/>
        </div>
    );
}

export default EmailVerifiedPage;
