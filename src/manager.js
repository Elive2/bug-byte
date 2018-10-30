import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {BrowserRouter} from 'react-router-dom';
//import App from './components/App';
import ManagerDash from './components/ManagerDash';

//when index.js is served, the below render method is called
//which selects the root element from index.html in ../public/
document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(<ManagerDash />, document.getElementById('manager'));
	//ReactDOM.render(<DevDash />, document.getElementById('root'));
  });


