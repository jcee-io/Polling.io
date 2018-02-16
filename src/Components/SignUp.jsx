import React from 'react';

export default props => (
  <form onSubmit={props.handler}>
    Username: <input name="username"/>
    Password: <input type="password" name="password"/>
    Email: <input name="email"/>
    <button>Submit</button>
  </form>
);