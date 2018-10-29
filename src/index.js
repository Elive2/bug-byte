import React from 'react';
import { render }from 'react-dom';
import './index.css';
//import {BrowserRouter} from 'react-router-dom';
<<<<<<< HEAD
//import App from './components/App';
import DevDash from './components/DevDash';

//when index.js is served, the below render method is called
//which selects the root element from index.html in ../public/
render((
	<DevDash />
), document.getElementById('root'));
=======
import App from './components/App';
import ClientDash from './components/ClientDash';
import ManagerDash from './components/ManagerDash';

//when index.js is served, the below render method is called
//which selects the root element from index.html in ../public/
if (document.getElementById('root')) {
	render((
		<App/>
	), document.getElementById('root'));
}
>>>>>>> d4c7396a14a1e1cbaf92672ca7a139a4129e550a
