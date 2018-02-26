import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
class UserPollsEntry extends Component {
	constructor(props) {
		super(props);

		this.username = this.props.match.params.username;
		this.title = this.props.match.params.title;
		
		this.token = localStorage.getItem('token');

		this.state = {
			options: {},
			chartData: null
		}
	}

	async componentDidMount() {
		await this.setOptions();
		await this.setChart();
	}

	async setChart() {
		const options = Object.keys(this.state.options);
		const votes = options.map(option => this.state.options[option].votes);

		votes.push(0);

		const chartData = {
		  labels: options,
		  datasets: [
		    {
		      label: 'hello',
		      backgroundColor: 'rgba(255,99,132,0.2)',
		      borderColor: 'rgba(255,99,132,1)',
		      borderWidth: 1,
		      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
		      hoverBorderColor: 'rgba(255,99,132,1)',
		      data: votes
		    }
		  ]
		};

		this.setState({ chartData });
	}
	async setOptions() {
		const { data } = await axios.get(`/api/${this.username}/${this.title}`)

		const options = {};

		for(let option of data.options) {
			let { name, votes, id } = option;

			options[name] = { votes, id };
		}

		console.log(options);
		this.setState({ options });
	}

	async vote(e) {
		const option = e.target.textContent;
		const options = this.state.options;
		options[option].votes++;

		axios.put('/vote', { id: options[option].id });

		await this.setState({ options });
		this.setChart();
	}

	async handleSubmit(e) {
		const form = e.target;
		const options = this.state.options;
		const choice = form.choice.value;
		options[choice] = { votes: 0 };

		e.preventDefault();
		e.stopPropagation();
		form.choice.value = '';

		await this.setState({ options });
		await this.setChart();
	}
	render () {
		const { options } = this.state;
		return (
			<div>
			  <h1>{this.title}?</h1>
			  {this.state.chartData ?
				  <Bar
	          data={this.state.chartData}
	          width={50}
	          height={25}
	          options={{
	            maintainAspectRatio: false
	          }}
       		/> : []
			  }
			  {Object.keys(options).map(option =>
			  <h2><button onClick={this.vote.bind(this)}>{option}</button> {options[option].votes}</h2>
			  ) || []}
			  {
			  	!this.token ?
			  	<h2>You must be logged in to add more options</h2> :
			  	<div>
			  		<form onSubmit={this.handleSubmit.bind(this)}>
				  		<input name="choice" />
				  		<button>Add Option</button>
			  		</form>
			  	</div>
			  }
			</div>
		);
	}
}

export default UserPollsEntry;