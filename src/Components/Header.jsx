import React from 'react';
import { Link } from 'react-router-dom';


const NormalHeader = () => (
	<ul className="nav navbar-nav ml-auto navbar-right">
    <li className="nav-item">
  	  <Link className="nav-link" to="/signup">Sign Up</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
	</ul>
);

const SecretHeader = () => (
	<ul className="nav navbar-nav ml-auto navbar-right">
    <li className="nav-item">
  	  <Link className="nav-link" to="/logout">Logout</Link>
    </li>
	</ul>
);

export default props => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link className="navbar-brand" to="/">Polling.io</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse order-3" id="navbarNavDropdown">
      {props.authenticated ?
        <SecretHeader /> :
        <NormalHeader />
      }
    </div>
  </nav>
);


