import React from 'react';
import {
  HashRouter,
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
  <HashRouter history={ hashHistory }>
    <div>
      <main>
        <Switch>
          <Route path="/client" component={ClientDash} />
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
  </HashRouter>
);

export default App;
