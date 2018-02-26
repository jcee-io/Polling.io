import React from 'react';
import { Link } from 'react-router-dom';

export default ({ polls, handler }) => (
	<div>
	  <h1>VIEW POLLS</h1>
	  {polls.map(poll => 
	  	<div>
		  	<button name={poll.name} onClick={handler}>Delete</button>
		  	<Link to={`/${localStorage.getItem('username')}/${poll.name}`}>{poll.name}</Link>
			</div>
) || []}
	</div>
);