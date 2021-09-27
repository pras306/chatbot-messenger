import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import history from '../history';
import Routes from './Routes/Routes';
import Loader from '../components/Loader/Loader';

const App = ({ loader }) => {
  const renderLoader = () => {
    if(loader.pageLoader){
      return <Loader />
    }
  }

  return (
    <div className="app">
      <div className="app__body">
        <Router history={history}>
          {renderLoader()}
          <Routes />
        </Router>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { loader: state.actions }
}

export default connect(
  mapStateToProps
)(App);
