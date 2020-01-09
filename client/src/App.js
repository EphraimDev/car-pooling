import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import store from './store';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <div className='App'>
          <Navbar />
          {/* <Alert /> */}
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
