import React, { Component, Fragment } from 'react';
import './App.css';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './pages/Register';
import Profile from './pages/Profile';
// Should add a 'no match' page later.
// import NoMatch from "./pages/NoMatch";
import Login from './pages/Login';
import Auth from './Auth/Auth.js';

// To access map for now use localhost:3000/map
import Map from "./pages/Map";

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/:id" component={Profile} />
        {/* Route to test map */}
        <Route exact path="/map" component={Map} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
    </div>
  </Router>
);

const auth = new Auth();
auth.login();

export default App;
