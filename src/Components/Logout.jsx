import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default props => {
  if(props.authenticated) {
  	return <Logout {...props} />
  }
  
  return <Redirect to="/" />
};

class Logout extends Component {
	constructor(props) {
	  super(props);
	}

	componentWillUnmount() {
		localStorage.removeItem('token');
	}

	render() {
		return(
			<h1> You have logged out </h1>
		);
	}
}
