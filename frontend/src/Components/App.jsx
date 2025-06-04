import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import Header from './Header.jsx'
import ChatPage from './pages/ChatPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import NotFound from './pages/NotFound.jsx'
import routes from '../routes.js'

const PrivatRoute = ({ children }) => {
  const token = useSelector(state => state.authReducer.token)

  return token ? children : <Navigate to="/login" replace />
}

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Header />
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
)

export default App
