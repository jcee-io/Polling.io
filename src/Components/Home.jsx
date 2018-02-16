import React from 'react';
import Secret from './Secret';
import { Link } from 'react-router-dom';
export default props => {
	if(props.authenticated) {
		return (<Secret />);
	}

	return (<Home />);
};

const Home = () => (
  <div>
  	<Link className="btn btn-success" to="/signup">Sign Up</Link>
    <Link className="btn btn-success" to="/login">Login</Link>
  </div>
);