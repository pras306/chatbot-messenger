import React from 'react';
import { Router } from 'react-router-dom';

import './App.css';
import history from '../history';
import Routes from './Routes/Routes';

const App = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Router history={history}>
          <Routes />
        </Router>
      </div>
    </div>
  );
}

export default App;
