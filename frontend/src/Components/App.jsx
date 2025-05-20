import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import routes from '../routes.js';

const PrivatRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={routes.mainPage}
        element={(
          <PrivatRoute>
            <MainPage />
          </PrivatRoute>
        )}
      />
      <Route path={routes.loginPage} element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
