import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import Logout from './Logout';
import Secret from './Secret';
import UserPolls from './UserPolls';
import UserPollsEntry from './UserPollsEntry';
import JWTDecode from 'jwt-decode';

class App extends Component {
  constructor() {
    super();

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.unauthenticate = this.unauthenticate.bind(this);

    this.state = {
      authenticated: false,
      username: null
    };

    console.log(localStorage);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log(localStorage);
    if(token) {
      this.setState({ authenticated: true });
      const { username } = JWTDecode(token);
      localStorage.setItem('username', username);
    }
  }

  authenticate(err, token) {
    if(err) {
      console.log(err);
    }

    if(token) {
      const { username } = JWTDecode(token);

      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      console.log(localStorage);

      this.setState({ authenticated: true }); 
    }
  }

  unauthenticate() {
    this.setState({ authenticated: false });
    localStorage.removeItem('token'); 
    localStorage.removeItem('username');
  }
  async handleLogin(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;

    e.preventDefault();

    const { data } = await axios.post('/login', { username, password });

    this.authenticate(data.error, data.token);

  }

  async handleSignUp(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;
    email = email.value;

    e.preventDefault();

    const { data } = await axios.post('/signup', { username, password, email })

    this.authenticate(data.error, data.token);
  }
  render() {

    const { authenticated, secretView } = this.state;
    const { handleLogin, handleSignUp } = this;

    return (
      <div>
        <Header authenticated={authenticated} />
        <Switch>
          <Route exact path="/" render={() => 
            <Home 
              {...this.state} 
            />}
          />
          <Route exact path="/login" render={() => 
            <Login 
              authenticated={authenticated}
              handler={this.handleLogin}
            />}
          />
          <Route exact path="/logout" render={() => 
            <Logout 
              authenticated={authenticated}
              unauthenticate={this.unauthenticate}
            />}
          />
          <Route exact path="/signup" render={() =>
            <SignUp 
              authenticated={authenticated}
              handler={this.handleSignUp}
            />}
          />
          <Route exact path="/:username" render={(props) => <UserPolls {...props} />} />
          <Route exact path="/:username/:title" render={(props) => <UserPollsEntry {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;