import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';
// import { combineReducers } from 'redux-immutable';
import {
  Provider,
} from 'react-redux';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import App from './App';

import * as reducers from './modules/reducer';

const appliedMiddlewares = [thunk];
const createStoreWithMiddleware = compose(
  applyMiddleware(...appliedMiddlewares),
  window.devToolsExtension ? window.devToolsExtension() : (f) => f,
)(createStore);
const reducer = combineReducers({ ...reducers });
const store = createStoreWithMiddleware(reducer);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
