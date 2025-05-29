/* eslint-disable functional/no-expression-statement */
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatPage from './ChatPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import NotFound from './NotFound.jsx';
import routes from '../routes.js';

const rollbarConfig = {
  accessToken: '1c500ba8f73244d4b91cd9442f6a2266',
  environment: 'testenv',
};

function TestError() {
  const a = null;
  return a.hello();
}

const PrivatRoute = ({ children }) => {
  const token = useSelector((state) => state.authReducer.token);
  console.log('PrivatRoute token:', token);
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  const { t } = useTranslation();

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
              <Container>
                <Navbar.Brand as={Link} to={routes.chatPage}>{t('name')}</Navbar.Brand>
              </Container>
            </Navbar>
            <Routes>
              <Route path="/" element={<Navigate to={routes.chatPage} replace />} />
              <Route
                path={routes.chatPage}
                element={(
                  <PrivatRoute>
                    <ChatPage />
                  </PrivatRoute>
                )}
              />
              <Route path={routes.loginPage} element={<LoginPage />} />
              <Route path={routes.registerPage} element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </div>
        </BrowserRouter>
        <TestError />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
