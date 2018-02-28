import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import urlencode from 'urlencode';


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
			<div id="user-polls">
				<h1>{this.username}'s POLLS</h1>
				{this.state.polls.map(poll => 
					<Link style={{ color: 'black'}} to={`/${this.username}/${urlencode(poll)}`}>
						<button className="btn btn-outline-dark btn-block btn-lg">
					  	{poll}
					  </button>
					</Link>
				)}
			</div>
		);
	}
}

export default UserPolls;
