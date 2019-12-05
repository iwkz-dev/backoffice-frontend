import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import history from 'shared/utils/history';
import reducers from 'shared/reducers';
import middlewares from 'shared/middleware';
import App from './App';

const ROOT_NODE = document.getElementById('app');

async function init() {
  const appReducers = combineReducers({
    ...reducers,
    router: connectRouter(history),
  });

  const appStore = createStore(
    appReducers,
    compose(
      applyMiddleware(routerMiddleware(history), ...middlewares),
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
    ),
  );

  ReactDOM.render((
    <App store={appStore} />
  ), ROOT_NODE);
}

$(document).ready(init);

export default init;
