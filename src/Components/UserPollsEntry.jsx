import React, { Component } from 'react';
import axios from 'axios';

class UserPollsEntry extends Component {
	constructor(props) {
		super(props);

		this.username = this.props.match.params.username;
		this.title = this.props.match.params.title;
		
		this.state = {
			options: {}
		}
	}

	async componentDidMount() {
		const { data } = await axios.get(`/api/${this.username}/${this.title}`)

		const options = {};

		for(let option of data.options) {
			let { name, votes, id } = option;

			options[name] = { votes, id };
		}

		console.log(options);
		this.setState({ options });
	}

	vote(e) {
		const option = e.target.textContent;
		const options = this.state.options;
		options[option].votes++;

		axios.put('/vote', { id: options[option].id });

		this.setState({ options });
	}
	render () {
		const { options } = this.state;
		return (
			<div>
			  <h1>{this.title}?</h1>
			  {Object.keys(options).map(option =>
			  <h2><button onClick={this.vote.bind(this)}>{option}</button> {options[option].votes}</h2>
			  ) || []}
			</div>
		);
	}
}

export default UserPollsEntry;