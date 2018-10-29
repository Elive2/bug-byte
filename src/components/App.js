import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import ClientDash from './ClientDash';
import ManagerDash from './ManagerDash';
//import ManagerDash from './ManagerDash';
//import DeveloperDash from './DeveloperDash'
//import Login from './Login';
//import NotFound from './NotFound';
//import restricted from './Restricted';


const App = () => (
  <Router basename={'/~eyale/bug-byte'}>
    <Switch>
      <Route path={'${process.env.PUBLIC_URL}/'} component={ClientDash} />
      <Route path="/manager" component={ManagerDash}/>
      <Route path="/client" component={ClientDash}/>
      {/*
      <Route path="/home" component={restricted(Home)} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
      */}
    </Switch>
</Router>
);

export default App;