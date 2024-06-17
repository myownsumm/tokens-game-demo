import { Login } from '../modules/auth/components/Login/Login.tsx';


const authProtectedRoutes = [
  { path: '/', element: <div>Root Page</div> }
  // { path: '/game', element: <UserProfile/> },
]
const guestRoutes = [
  { path: '/login', element: <Login/> }
];

export { authProtectedRoutes, guestRoutes };
