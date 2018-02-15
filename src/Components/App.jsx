import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
const Header = () => (
	<nav>
  	<Link to="/signup">Sign Up</Link>
    <Link to="/login">Login</Link>
	</nav>
);
const Login = props => (
  <form onSubmit={props.handler}>
    Username: <input name="username"/>
    Password: <input type="password" name="password"/>
    <button>Submit</button>
  </form>
);

const SignUp = props => (
  <form onSubmit={props.handler}>
    Username: <input name="username"/>
    Password: <input type="password" name="password"/>
    Email: <input name="email"/>
    <button>Submit</button>
  </form>
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
  }

  async handleLogin(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;

  	e.preventDefault();

  	const { data } = await axios.post('/login', { username, password });
  	console.log(data);
  }
  async handleSignUp(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;
    email = email.value;

    e.preventDefault();

    const { data } = await axios.post('/signup', { username, password, email })

    console.log(data);

    
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={() => <Login handler={this.handleLogin}/>} />
          <Route exact path="/signup" render={() => <SignUp handler={this.handleSignUp}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;