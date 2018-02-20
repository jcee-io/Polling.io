import React from 'react';

export default props => (
	<div>
	  <h1>Create A New Poll</h1>
		<form id="create-form">
			<h2>Name</h2>
		  <input name="title" />
		  <h2>Options</h2>
		  {props.choices.map(choice => choice) || []}
		</form>
		<button onClick={props.addChoice}>More Options</button>
	</div>
);
