import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// named import
//  referendce to function inside element we're importing.
//  craetes const called render that references react-dom's render()
import { render } from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

// wrapping the app with the router component lets us use routes in the app component
render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
