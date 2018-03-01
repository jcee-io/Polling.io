import React, { Component } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import urlencode from 'urlencode';

const AddOption = props => (
	<div id="add-option">
  {
  	!props.token ?
  	<h2>You must be logged in to add more options</h2> :
  	<div>
  		<form onSubmit={props.handler}>
	  		<input className="form-control" name="choice" />
	  		<button className="btn btn-outline-dark btn-block">Add Option</button>
  		</form>
  	</div>
  }
  </div>
);

const Options = ({ options, vote }) => (
	<div>
	  {Object.keys(options).map(option =>
	  <button className="btn btn-outline-dark btn-block" onClick={vote}>{option}</button>
	  ) || []}
	</div>
);

const Chart = ({ chartData }) => (
	<div>
	  {chartData ?
		  <Bar
	      data={chartData}
	      width={300}
	      height={300}
	      options={{
	        maintainAspectRatio: false,
	        legend: {
	        	display: false
	        }
	      }}
	 		/> : []
	  }
	</div>
);

const PollOptions = ({ vote, options, token, handler }) => (
	<div>
		<Options options={options} vote={vote}/>
	  <AddOption token={token} handler={handler} />
  </div>
);

class UserPollsEntry extends Component {
	constructor(props) {
		super(props);

		this.username = this.props.match.params.username;
		this.title = this.props.match.params.title;
		
		console.log(this.title);
		this.token = localStorage.getItem('token');

		this.state = {
			options: {},
			chartData: null,
			voted: false
		}


		this.vote = this.vote.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		      label: options,
		      backgroundColor: 'darkgrey',
		      borderColor: 'grey',
		      borderWidth: 1,
		      hoverBackgroundColor: 'lightgrey',
		      hoverBorderColor: 'grey',
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

		await this.setState({ options, voted: true });
		this.setChart();
	}

	async handleSubmit(e) {
		const form = e.target;
		const options = this.state.options;
		const choice = form.choice.value;
		const { username, title, token } = this;

		
		e.preventDefault();
		e.stopPropagation();

		const { data } = await axios.put('/poll/add', { username, title: urlencode.decode(title), token, choice });


		form.choice.value = '';

		options[choice] = { votes: 0, id: data.id };

		await this.setState({ options });
		await this.setChart();
	}
	render () {
		const { options, chartData, voted } = this.state;
		const { title, token, vote, handleSubmit } = this;

		const optionProps = { token, options, vote, handler: handleSubmit };

		return (
			<div id="poll-entry">
			  <h1>{urlencode.decode(title)}</h1>
			  <div>
					{!voted ?
						<div id="poll-options"><PollOptions {...optionProps} /></div> :
						<Chart chartData={chartData} />
					}
				</div>
			</div>
		);
	}
}


export default UserPollsEntry;