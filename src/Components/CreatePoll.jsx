import React from 'react';

export default props => (
	<div>
		<form onSubmit={props.handler}>
			<h2>Question</h2>
		  <input className="form-control" name="title" />
		  <h2>Options</h2>
		  {props.choices.map(choice => choice) || []}
		  <button className="btn btn-outline-dark">Submit</button>
		  <button className="btn btn-outline-dark" type="button" onClick={props.addChoice}>More Options</button>
		</form>
		
	</div>
);
