import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

import { Provider } from 'react-redux';
import createStore from './create-store';

const store = createStore();

const root = document.getElementById('root');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, root)
