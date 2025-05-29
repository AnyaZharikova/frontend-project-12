/* eslint-disable functional/no-conditional-statement */
/* eslint-disable functional/no-expression-statement */
import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import leoProfanity from 'leo-profanity';

import App from './Components/App.jsx';
import setupSocketHandlers from './services/socketHandlers.js';
import store from './services/index.js';
import initSocket from './services/socket.js';
import resources from './locales/index.js';
import { setCredentials } from './slices/authSlice.js';

leoProfanity.clearList();
leoProfanity.add(leoProfanity.getDictionary('ru'));
leoProfanity.list();

const initApp = () => {
  const i18n = i18next.createInstance();
  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  if (username && token) {
    store.dispatch(setCredentials({ username, token }));
  }

  const socket = initSocket(token);

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
