import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {BrowserRouter} from 'react-router-dom';
//import App from './components/App';
import DevDash from './components/DevDash';

//when dev.js is served, the below render method is called
//which selects the root element from dev.php
document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(<DevDash />, document.getElementById('dev'));
	//ReactDOM.render(<DevDash />, document.getElementById('root'));
  });