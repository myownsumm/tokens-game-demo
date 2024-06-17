import { Routes, Route } from 'react-router-dom';

import { authProtectedRoutes, guestRoutes } from './AllRoutes';
import { ProtectedRoute } from './ProtectedRoute';
import GuestLayout from '../modules/layout/guest.layout.tsx';
import AuthLayout from '../modules/layout/auth.layout.tsx';


const Index = () => {
  const routesList = {
    auth: authProtectedRoutes,
    guest: guestRoutes
  }

  return (
    <Routes>
      <Route>
        { routesList.guest.map((route, idx) => (
          <Route
            path={ route.path }
            element={
              <GuestLayout>
                { route.element }
              </GuestLayout>
            }
            key={ idx }
          />
        )) }
      </Route>

      <Route>
        { routesList.auth.map((route, idx) => (
          <Route
            path={ route.path }
            element={
              <ProtectedRoute>
                <AuthLayout>{ route.element }</AuthLayout>
              </ProtectedRoute> }
            key={ idx }
          />
        )) }
      </Route>
    </Routes>
  );
};

export default Index;
