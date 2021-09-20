import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './containers/App';
import reducers from './reducers';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  saveState({
    authUser: store.getState().authUser
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);