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
			choiceIndex: 0
		}

		this.viewCreate = this.viewCreate.bind(this);
		this.viewViews = this.viewViews.bind(this);
		this.addChoice = this.addChoice.bind(this);
		this.handleCreate = this.handleCreate.bind(this);
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

	handleCreate(e) {
		const form = e.target;
		const title = form.title.value;
		const token = localStorage.getItem('token');
		const choices = {};


		

		for(let i = 0; i <= this.state.choiceIndex; i++) {
			let choiceValue = form[`choice[${i}]`].value;
			choices[i] = choiceValue;
		}
		

		
		e.preventDefault();
		e.stopPropagation();
		axios.post('/create', { title, choices, token })
		  .then(({data}) => console.log(data));
	}
	render() {
		const { view, choices } = this.state;
		const { viewCreate, viewViews, addChoice, handleCreate } = this;

		return (
			<div>
				<button onClick={viewCreate.bind(this)}>New Poll</button>
				<button onClick={viewViews.bind(this)} >View Polls</button>
				{view === 'create' ?
				  <CreatePoll addChoice={addChoice} choices={choices} handler={handleCreate} /> :
				  <ViewPolls />
				}
			</div>
		);
	}
}

export default Secret;
