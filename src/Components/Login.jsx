import React from 'react';
import { Redirect } from 'react-router-dom';

export default props => {
	return !props.authenticated ?
	  <Form {...props} /> :
	  <Redirect to="/" />
};


const Form = props => (
	<div className="auth-form">
	  <form className="form-group" onSubmit={props.handler}>
	    Username <br /><input className="form-control" name="username"/><br />
	    Password <br /><input className="form-control" type="password" name="password"/><br />
	    <button className="btn btn-outline-dark btn-block">Submit</button>
	  </form>
  </div>
);