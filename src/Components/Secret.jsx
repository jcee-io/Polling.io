import React, { Component } from 'react';
import CreatePoll from './CreatePoll';
import ViewPolls from './ViewPolls';

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

	render() {
		const { view } = this.state;
		const { viewCreate, viewViews, addChoice } = this;

		return (
			<div>
				<button onClick={viewCreate.bind(this)}>New Poll</button>
				<button onClick={viewViews.bind(this)} >View Polls</button>
				{view === 'create' ?
				  <CreatePoll addChoice={addChoice} choices={this.state.choices} /> :
				  <ViewPolls />
				}
			</div>
		);
	}
}

export default Secret;
