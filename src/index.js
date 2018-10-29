import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import {BrowserRouter} from 'react-router-dom';
//import App from './components/App';
<<<<<<< HEAD
import ClientDash from './components/ClientDash';
import DevDash from './components/DevDash'
=======
import DevDash from './components/DevDash';
import ClientDash from './components/ClientDash';
>>>>>>> 23343b21ceaf223fdc57911090c7c575d411e8ad

//when index.js is served, the below render method is called
//which selects the root element from index.html in ../public/
document.addEventListener("DOMContentLoaded", function(event) {
    ReactDOM.render(<ClientDash />, document.getElementById('root'));
	//ReactDOM.render(<DevDash />, document.getElementById('root'));
  });
