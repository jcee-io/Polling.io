import React from 'react';
import { Link } from 'react-router-dom';
import urlencode from 'urlencode';

export default ({ polls, handler }) => (
	<div>
	  {polls.map(poll => 
	  	<div>
		  	<button name={poll.name} onClick={handler}>Delete</button>
		  	<Link to={`/${localStorage.getItem('username')}/${urlencode(poll.name)}`}>{poll.name}</Link>
			</div>
) || []}
	</div>
);