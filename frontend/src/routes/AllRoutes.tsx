import { Login } from '../modules/auth/components/Login/Login.tsx';
import { Dashboard } from '../modules/tokens-management/Dashboard/Dashboard.tsx';


const authProtectedRoutes = [
  { path: '/dashboard', element: <Dashboard/> }
]
const guestRoutes = [
  { path: '/login', element: <Login/> }
];

export { authProtectedRoutes, guestRoutes };
