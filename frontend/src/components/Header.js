import React from 'react';


function Header()
{
    return(
        <div id="header">  
            <h1>Testing different pages</h1>
            <a href="/">Root/Sign In</a>
            <a href="/ForgotPassword">Forgot Password</a>
            <a href="/SignUp">Sign Up</a>
            <a href="/ListOfBoards">List Of Boards</a>
            <a href="/BoardPage">Board Page</a>
            <a href="/UserSettings">User Settings</a>
            <a href="/EmailVerification/:id">Email Verification</a>
            <a href="/UpdatePassword/:id">Reset Password</a>
        </div>
    );
};

export default Header;
