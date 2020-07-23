import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';

function Header()
{

    return(

        
        <div>
            <Navbar bg="primary" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link href="/ListOfBoards">Home</Nav.Link>
                </Nav>
                <Navbar.Brand className="m-auto" href="/ListOfBoards">
                    <img id="headerlogo" src="/dntlogo.png" alt="alternatetext"></img>
                    Definitely Not Trello</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link href="/SignIn">Log Out</Nav.Link>
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

export default Header;
