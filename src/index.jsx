import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { BrowserRouter } from 'react-router-dom';

const Main = () => (
	<div>
	  <BrowserRouter>
	    <App/>
	  </BrowserRouter>
	</div>
);
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(<Main />,document.getElementById('app'));
});