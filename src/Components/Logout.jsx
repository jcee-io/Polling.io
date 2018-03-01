import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default props => {
  return <Logout unauthenticate={props.unauthenticate} />
};

class Logout extends Component {
	constructor(props) {
	  super(props);
	}

	async componentDidMount() {
		const token = localStorage.getItem('token');
		console.log(token);
		await this.props.unauthenticate();
		await axios.post('/logout', { token });
	}

	render() {
		return(
			<h1>You have logged out</h1>
		);
	}
}
