import React from 'react';
import { Link } from 'react-router-dom';
import urlencode from 'urlencode';

export default ({ polls, handler }) => (
	<div>
	  {polls.map(poll => 
	  	<div>
	  		<div className="row">
	  			<div className="col-md-8">
	  				<Link style={{ color: 'black'}} to={`/${localStorage.getItem('username')}/${urlencode(poll.name)}`}>
	  					<button  style={{ width: '100%'}} className="btn btn-outline-dark">
	  					  {poll.name}
	  					</button>
	  				</Link>
	  			</div>
	  			<div style={{textAlign: 'right'}} className="col-md-4">
	  				<button style={{ width: 100}} className="btn btn-outline-dark" name={poll.name} onClick={handler}>
	  				  Delete
	  				</button>
	  			</div>
	  		</div>
			</div>
		) || []}
	</div>
);