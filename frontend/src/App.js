import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ListOfBoards from './pages/ListOfBoards';
import UserSettings from './pages/UserSettings';
import BoardPage from './pages/BoardPage';

import './App.css';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/ForgotPassword" exact>
          <ForgotPassword />
        </Route>
        <Route path="/SignUp" exact>
          <SignUp />
        </Route>
        <Route path="/ListOfBoards" exact>
          <ListOfBoards />
        </Route>
        <Route path="/UserSettings" exact>
          <UserSettings />
        </Route>
        <Route path="/BoardPage" exact>
          <BoardPage />
        </Route>
        <Redirect to="/" />
      </Switch>  
    </Router>
  );
}

export default App;
