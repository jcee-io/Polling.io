import React, { Component } from 'react';
import CreatePoll from './CreatePoll';
import ViewPolls from './ViewPolls';
import axios from 'axios';

class Secret extends Component {
	constructor(props) {
		super(props);

		this.state = {
			view: 'create',
			choices: [<input name="choice[0]" />, <br />],
			choiceIndex: 0,
			polls: []
		}

		this.viewCreate = this.viewCreate.bind(this);
		this.viewViews = this.viewViews.bind(this);
		this.addChoice = this.addChoice.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	async componentDidMount() {
		const username = localStorage.getItem('username');
		const token = localStorage.getItem('token');

		const { data } = await axios.get(`/api/polls/${username}`, { params: { token, username } });
		console.log(data.polls);

		this.setState({ polls: data.polls });

	}
	viewViews() {
		this.setState({ view: 'views' });
	}

	viewCreate() {
		this.setState({ view: 'create'});
	}

	addChoice() {
		const choices = this.state.choices;
		const choiceIndex = this.state.choiceIndex + 1;
		const newChoice = <input name={`choice[${choiceIndex}]`}/>

		choices.push(newChoice, <br />);

		this.setState({ choices, choiceIndex });
	}

	async handleCreate(e) {
		const form = e.target;
		const title = form.title.value;
		const token = localStorage.getItem('token');
		const username = localStorage.getItem('username');
		const choices = {};

		for(let i = 0; i <= this.state.choiceIndex; i++) {
			let choiceValue = form[`choice[${i}]`].value;
			choices[i] = choiceValue;
		}
		
		e.preventDefault();
		e.stopPropagation();

		const { data } = await axios.post('/create', { title, choices, token, username });
		const id = data.id;
		const polls = this.state.polls;

		polls.push({ id, name: title });

		this.setState({ polls, view: 'views' });
	}

	handleDelete(e) {
		let targetPoll;
		let targetIndex;
		const polls = this.state.polls;
		const token = localStorage.getItem('token');

		for(let i = 0; i < polls.length; i++) {
			let poll = polls[i];

			if(e.target.name === poll.name) {
				targetPoll = poll;
				targetIndex = i;
			}
		}

		polls.splice(targetIndex, 1);

		this.setState({ polls });

		axios.delete('/poll', { params: { id: targetPoll.id, token } });
	}
	render() {
		const { view, choices, polls } = this.state;
		const { viewCreate, viewViews, addChoice, handleCreate, handleDelete } = this;

		return (
			<div>
				<button onClick={viewCreate.bind(this)}>New Poll</button>
				<button onClick={viewViews.bind(this)} >View Polls</button>
				{view === 'create' ?
				  <CreatePoll addChoice={addChoice} choices={choices} handler={handleCreate} /> :
				  <ViewPolls polls={polls} handler={handleDelete} />
				}
			</div>
		);
	}
}

export default Secret;
