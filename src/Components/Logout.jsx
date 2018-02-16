import React, { Component } from 'react';

export default () => (
  <div>
    <h1>Are you sure you want to Logout?</h1>
    <button>Yes</button>
    <button>No, take me back</button>
  </div>
);

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
