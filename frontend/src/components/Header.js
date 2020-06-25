import React from 'react';


function Header()
{
    return(
        <div>  
            <h1>Testing different pages</h1>
            <a href="/">Root/Sign In</a><br />
            <a href="/ForgotPassword">ForgotPassword</a><br />
            <a href="/SignUp">SignUp</a><br />
            <a href="/ListOfBoards">ListOfBoards</a><br />
            <a href="/BoardPage">BoardPage</a><br />
            <a href="/UserSettings">UserSettings</a><br />
            <a href="/EmailVerification/:id">Email Verification</a><br />
            <a href="/UpdatePassword/:id">Reset Password</a><br />
        </div>
    );
};

export default Header;
