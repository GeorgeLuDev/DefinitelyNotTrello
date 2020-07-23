import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';

function NavBarUi()
{

    return(

        
        <div id = "headernavbar">
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand id="logoheader" className="mr-auto">
                    <img id="headerlogo" src="/dntlogo.png" alt="alternatetext"></img>
                    Definitely Not Trello</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/SignIn">Log in</Nav.Link>
                    <Nav.Link href="/SignUp">Sign Up</Nav.Link>
                </Nav>
            </Navbar>
            {/* <a href="/">Root/Sign In</a><br />
            <a href="/ForgotPassword">ForgotPassword</a><br />
            <a href="/SignUp">SignUp</a><br />
            <a href="/ListOfBoards">ListOfBoards</a><br />
            <a href="/BoardPage">BoardPage</a><br />
            <a href="/UserSettings">UserSettings</a><br />
            <a href="/EmailVerification/:id">Email Verification</a><br />
            <a href="/UpdatePassword/:id">Reset Password</a><br /> */}
        </div>
    );
};

export default NavBarUi;
