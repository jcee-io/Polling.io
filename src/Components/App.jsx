import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import SignUp from './SignUp';
import Login from './Login';
const Header = () => (
	<nav>
  	<Link to="/signup">Sign Up</Link>
    <Link to="/login">Login</Link>
	</nav>
);

const Home = () => (
  <div>
  	<Link className="btn btn-success" to="/signup">Sign Up</Link>
    <Link className="btn btn-success" to="/login">Login</Link>
  </div>
);

class App extends Component {
  constructor() {
    super();

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
    	authenticated: false
    };
  }

  async handleLogin(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;

  	e.preventDefault();

  	const { data } = await axios.post('/login', { username, password });

  	if(data.token) {
  		localStorage.setItem('token', data.token);
  	}

  	this.setState({ authenticated: true });
  }

  async handleSignUp(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;
    email = email.value;

    e.preventDefault();

    const { data } = await axios.post('/signup', { username, password, email })

  	if(data.token) {
  		localStorage.setItem('token', data.token);
  	}

  	this.setState({ authenticated: true });
 
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/login" render={() => 
          	<Login 
          	  authenticated={this.state.authenticated}
          	  handler={this.handleLogin}
          	/>}
          />
          <Route exact path="/signup" render={() =>
          	<SignUp 
          	  authenticated={this.state.authenticated}
          	  handler={this.handleSignUp}
          	/>}
          />
        </Switch>
      </div>
    );
  }
}

export default App;