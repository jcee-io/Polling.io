import React from 'react';
import Secret from './Secret';
import { Link } from 'react-router-dom';
export default props => {
	if(props.authenticated) {
		return (<Secret view={props.secretView} />);
	}

	return (<Home />);
};

const Home = () => (
  <div id="home">
  	<div className="row" id="home-top">
  		<div className="col-md-12">
	  		<h1>Polling.io</h1>
	  		<h2>Enhance your discussion</h2>
		  	<Link className="home-button btn btn-success" to="/signup">Sign Up</Link>
		    <Link className="home-button btn btn-success" to="/login">Login</Link>
  		</div>
    </div>
    <div className="row" id="home-bottom">
    	<div className="col-md-3">
    		<i className="fa fa-list-ul" />
    		<h3>Create Your Own Polls</h3>
    		<p>
    			Feel free to create your own poll to enhance your discussion. All you need to do is create an account to
    			save all of your polls. However, anyone can vote regardless of having an account. Sign up today!
    		</p>
    	</div>
    	<div className="col-md-3">
    		<i className="fa fa-user" />
    		<h3>Share With Your Friends</h3>
    		<p>
    			Planning to go on a trip? Trying to stay organized? You can go ahead create a poll and share for your friends
    			to choose from. 
    		</p>
    	</div>
    	<div className="col-md-3">
    		<i className="fa fa-paste" />
    		<h3>Get Results Instantly</h3>
    		<p>
    			Your results are displayed on a chart and responds to your vote. You can leave and come back later to 
    			see if anyone voted for it.
    		</p>
    	</div>
    	<div className="col-md-3">
    		<i className="fa fa-code" />
    		<h3>Open Source</h3>
    		<p>
    			This website is open to being improved, innovated, and has an existing codebase on GitHub. Contributions
    			and Pull Requests are very welcome.
    		</p>
    	</div>
    </div>
  </div>
);