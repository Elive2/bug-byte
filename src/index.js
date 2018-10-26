import React from 'react';
import { render }from 'react-dom';
import './index.css';
import {BrowserRouter} from 'react-router-dom';
import App from './components/App';

//when index.js is served, the below render method is called
//which selects the root element from index.html in ../public/
render((
	<App />
), document.getElementById('root'));