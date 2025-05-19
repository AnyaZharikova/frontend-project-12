import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import AuthProvider from '../context/index.jsx';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import routes from './routes.js';

const PrivatRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path={routes.mainPage} element={<PrivatRoute />} />
        <Route path={routes.LoginPage} element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
