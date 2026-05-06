import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '../constants/routes.constants';
import PageWrapper from '../components/layout/PageWrapper';

// Routes components
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

// Pages
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Login from '../features/auth/pages/Login';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          {/* Public Routes - accessible only if NOT logged in */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<Login />} />
          </Route>

          {/* Protected Routes - accessible only if logged in */}
          <Route element={<ProtectedRoute />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          </Route>

          {/* Unrestricted Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
};

export default AppRouter;
