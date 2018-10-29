import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import ClientDash from './ClientDash';
import ManagerDash from './ManagerDash';
//import ManagerDash from './ManagerDash';
//import DeveloperDash from './DeveloperDash'
//import Login from './Login';
//import NotFound from './NotFound';
//import restricted from './Restricted';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={ClientDash} />
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