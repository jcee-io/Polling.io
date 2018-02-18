import React from 'react';
import { Redirect } from 'react-router-dom';

export default props => {
	return !props.authenticated ?
	  <Form {...props} /> :
	  <Redirect to="/" />
};


const Form = props => (
  <form onSubmit={props.handler}>
    Username: <input name="username"/>
    Password: <input type="password" name="password"/>
    <button>Submit</button>
  </form>
);