import multi from 'redux-multi';
import thunk from 'redux-thunk';
import api from './api';
import apiPolling from './api-polling';
import webStorage from './webStorage';

export default [
  api,
  apiPolling,
  thunk,
  webStorage,
  multi,
];
