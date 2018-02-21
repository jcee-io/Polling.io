import React from 'react';

export default ({ polls }) => (
	<div>
	  <h1>VIEW POLLS</h1>
	  {polls.map(poll => <p>{poll.name}</p>) || []}
	</div>
);