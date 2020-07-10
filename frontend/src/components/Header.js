import React from 'react';


function Header()
{
    return(
        <div id="header">  
            <h1>Testing different pages</h1>
            <a href="/">Root/Sign In</a>
            <a href="/ForgotPassword">ForgotPassword</a>
            <a href="/SignUp">SignUp</a>
            <a href="/ListOfBoards">ListOfBoards</a>
            <a href="/BoardPage">BoardPage</a>
            <a href="/UserSettings">UserSettings</a>
            <a href="/EmailVerification/:id">Email Verification</a>
            <a href="/UpdatePassword/:id">Reset Password</a>
        </div>
    );
};

export default Header;
