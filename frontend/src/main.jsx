/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './Components/App.jsx';
import store from './slices/index.js';
import { setCredentials } from './slices/authSlice.js';

const tokenFromStorage = localStorage.getItem('token');
const parsedToken = tokenFromStorage ? JSON.parse(tokenFromStorage) : null;

if (tokenFromStorage) {
  store.dispatch(setCredentials({ token: tokenFromStorage }));
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
