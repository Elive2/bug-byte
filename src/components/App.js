import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import ClientDash from './ClientDash';
import ManagerDash from './ManagerDash';
import DevDash from './DevDash'
//import ManagerDash from './ManagerDash';
//import DeveloperDash from './DeveloperDash'
//import Login from './Login';
//import NotFound from './NotFound';
//import restricted from './Restricted';


const App = () => (
  <Router basename={'/~eyale/bug-byte'}>
    <div>
      <main>
        <Switch>
          <Route exact path="/client" component={ClientDash} />
          <Route exact path="/manager" component={ManagerDash}/>
          <Route exact path="/" component={DevDash}/>
          <Route path = {'${process.env.PUBLIC_URL/}'} component={DevDash} />
          {/*
          <Route path="/home" component={restricted(Home)} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
          */}
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
