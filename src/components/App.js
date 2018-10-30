import React from 'react';
import {
  Router,
  Route,
  Switch,
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
  <BrowserRouter basename=''>
    <div>
      <main>
        <Switch>
          <Route path="/client" component={ClientDash} />
          <Route path="/manager" component={ManagerDash}/>
          <Route path="/dev" component={DevDash}/>
          {/*
          <Route path="/home" component={restricted(Home)} />
          <Route path="/about" component={About} />
          <Route component={NotFound} />
          */}
        </Switch>
      </main>
    </div>
  </BrowserRouter>
);

export default App;
