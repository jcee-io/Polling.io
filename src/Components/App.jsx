import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import axios from 'axios';
const Header = () => (
	<nav>
  	<Link to="/signup">Sign Up</Link>
    <Link to="/login">Login</Link>
	</nav>
);
const Login = () => (
  <div>
    Username: <input />
    Password: <input />
  </div>
);

const SignUp = props => (
  <form onSubmit={props.handler} id="signup">
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
  }

  async handleSignUp(e) {
    const form = e.target;
    let { username, password, email } = form;

    username = username.value;
    password = password.value;
    email = email.value;

    e.preventDefault();
    
    let response = await axios.post('/signup', { username, password, email })

    console.log(response);

    
  }
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" render={() => <Login />} />
          <Route exact path="/signup" render={() => <SignUp handler={this.handleSignUp}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;