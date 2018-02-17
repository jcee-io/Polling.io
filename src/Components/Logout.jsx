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

	componentDidMount() {
		this.props.unauthenticate();
	}

	render() {
		return(
			<Redirect to="/" />
		);
	}
}
