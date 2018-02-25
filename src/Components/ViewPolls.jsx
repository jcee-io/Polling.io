import React from 'react';
import { Link } from 'react-router-dom';

export default ({ polls }) => (
	<div>
	  <h1>VIEW POLLS</h1>
	  {polls.map(poll => 
	  	<div>
	  	<button>Delete</button>
	  	<Link to={`/${localStorage.getItem('username')}/${poll.name}`}>{poll.name}</Link>
	  	
	 </div>
) || []}
	</div>
);