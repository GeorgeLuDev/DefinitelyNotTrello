import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import ListOfBoardsPage from './pages/ListOfBoardsPage';
import UserSettingsPage from './pages/UserSettingsPage';
import BoardPage from './pages/BoardPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';

import './App.css';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <SignInPage />
        </Route>
        <Route path="/SignUp" exact>
          <SignUpPage />
        </Route>
        <Route path="/ForgotPassword" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/ListOfBoards" exact>
          <ListOfBoardsPage />
        </Route>
        <Route path="/BoardPage" exact>
          <BoardPage />
        </Route>
        <Route path="/UserSettings" exact>
          <UserSettingsPage />
        </Route>
        <Route path="/UpdatePassword/:id" exact>
          <UpdatePasswordPage />
        </Route>
        <Route path="/EmailVerification/:id" component={EmailVerifiedPage} exact>
          <EmailVerifiedPage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
