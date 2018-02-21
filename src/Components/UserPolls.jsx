import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



class UserPolls extends Component {
	constructor(props) {
		super(props);

		//this.username = this.match.params.username;

		this.username = this.props.match.params.username;
		console.log(this.username);

		this.state = {
			polls: []
		}
	}

	async componentDidMount() {
		const { data } = await axios.get(`/api/${this.username}`);

		this.setState({ polls: data.polls.map(poll => poll.name) });
	}

	render() {
		return (
			<div>
				<h1>{this.username}'s POLLS</h1>
				{this.state.polls.map(poll => <h2><Link to={`/${this.username}/${poll}`}>{poll}</Link></h2>)}
			</div>
		);
	}
}

export default UserPolls;
