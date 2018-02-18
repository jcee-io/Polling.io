import React from 'react';
import { Link } from 'react-router-dom';


const NormalHeader = () => (
	<nav>
	  <Link to="/">Home</Link>
  	<Link to="/signup">Sign Up</Link>
    <Link to="/login">Login</Link>
	</nav>
);

const SecretHeader = () => (
	<nav>
  	<Link to="/logout">Logout</Link>
	</nav>
);

export default props => (
	<div>
  {props.authenticated ?
  	<SecretHeader /> :
  	<NormalHeader />
  }
  </div>
);