import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';

import AuthState from './context/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <Router>
        <Fragment>
          <Navbar />
            <Switch>
              {/* <PrivateRoute exact path='/' component={Home} /> */}
              <Route exact path='/' component={Home} />
              {/* <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} /> */}
            </Switch>
        </Fragment>
      </Router>
    </AuthState>
  );
};

export default App;
