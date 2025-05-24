/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './Components/App.jsx';
import store from './services/index.js';
import initSocket from './services/socket.js';
import setupSocketHandlers from './services/socketHandlers.js';
import { setCredentials } from './slices/authSlice.js';

const initApp = () => {
  const tokenFromStorage = localStorage.getItem('token');
  const usernameFromStorage = localStorage.getItem('username');
  const parsedToken = tokenFromStorage ? JSON.parse(tokenFromStorage) : null;
  const parsedUsername = usernameFromStorage ? JSON.parse(usernameFromStorage) : null;

  if (parsedUsername && parsedToken) {
    store.dispatch(setCredentials({ username: parsedUsername, token: parsedToken }));
  }

  const socket = initSocket(parsedToken);

  setupSocketHandlers(socket, store);

  const mountNode = document.getElementById('root');
  const root = ReactDOM.createRoot(mountNode);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
};

export default initApp;
