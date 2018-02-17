import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default props => {
	console.log(props);
  if(props.authenticated) {
  	return <Logout unauthenticate={props.unauthenticate} />
  }
  
  return <Redirect to="/" />
};

class Logout extends Component {
	constructor(props) {
	  super(props);
	}

	componentDidMount() {
		console.log(this.props);
		this.props.unauthenticate();
	}

	render() {
		return(
			<h1>You have logged out</h1>
		);
	}
}
