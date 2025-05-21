/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './Components/App.jsx';
import store from './slices/index.js';
import { setCredentials } from './slices/authSlice.js';

const tokenFromStorage = JSON.parse(localStorage.getItem('token'));
const usernameFromStorage = JSON.parse(localStorage.getItem('username'));

if (tokenFromStorage) {
  store.dispatch(setCredentials({ username: usernameFromStorage, token: tokenFromStorage }));
}

const mountNode = document.getElementById('root');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
