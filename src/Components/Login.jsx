import React from 'react';

export default props => (
  <form onSubmit={props.handler}>
    Username: <input name="username"/>
    Password: <input type="password" name="password"/>
    <button>Submit</button>
  </form>
);