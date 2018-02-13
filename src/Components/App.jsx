import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

const Login = () => (
  <h1>
    This is the login page!!!
  </h1>
);

const SignUp = () => (
  <h1>
    This is the signup page!!!
  </h1>
);

const Home = () => (
  <div>
  	<button>Sign Up</button>
    <button>Login</button>
  </div>
);

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
  </Switch>
);

export default App;