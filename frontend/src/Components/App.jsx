import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import { Navbar, Container, Button } from 'react-bootstrap'
import { Provider, ErrorBoundary } from '@rollbar/react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ChatPage from './ChatPage.jsx'
import LoginPage from './LoginPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import NotFound from './NotFound.jsx'
import { logOut } from '../slices/authSlice.js'
import routes from '../routes.js'

const rollbarConfig = {
  accessToken: '1c500ba8f73244d4b91cd9442f6a2266',
  environment: 'testenv',
}

const PrivatRoute = ({ children }) => {
  const token = useSelector(state => state.authReducer.token)

  return token ? children : <Navigate to="/login" replace />
}

const ExitButton = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const token = useSelector(state => state.authReducer.token)

  const handleClick = () => {
    dispatch(logOut())
  }

  return token ? <Button type="button" onClick={handleClick}>{t('exit')}</Button> : ''
}

const App = () => {
  const { t } = useTranslation()

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <div className="d-flex flex-column h-100">
            <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
              <Container>
                <Navbar.Brand as={Link} to={routes.chatPath()}>{t('name')}</Navbar.Brand>
                <ExitButton />
              </Container>
            </Navbar>
            <Routes>
              <Route path="/" element={<Navigate to={routes.chatPath()} replace />} />
              <Route
                path={routes.chatPath()}
                element={(
                  <PrivatRoute>
                    <ChatPage />
                  </PrivatRoute>
                )}
              />
              <Route path={routes.loginPath()} element={<LoginPage />} />
              <Route path={routes.registerPath()} element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          </div>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>
  )
}

export default App
