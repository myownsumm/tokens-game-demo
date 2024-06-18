import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { AuthUser } from '../auth.typings.ts';
import axios from 'axios';


interface IAuthContext {
  authUser: AuthUser | undefined;
  // That's not a common thing to persist the whole user in this way.
  // Secure way is to persist token (OAuth, JWT) and to fetch user info from BE
  // for Demo purposes let's leave it as is.
  persistUser: (u: AuthUser | undefined) => void;
}


const DEFAULT_AUTH_CONTEXT: IAuthContext = { authUser: undefined, persistUser: () => undefined };
const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const persistedAuthUserString = localStorage.getItem('authUser');
  const [ authUser, setAuthUser ] = useState(
    persistedAuthUserString ? JSON.parse(persistedAuthUserString) as AuthUser : undefined
  );

  function persistUser(u: AuthUser | undefined): void {
    u ? localStorage.setItem('authUser', JSON.stringify(u)) : localStorage.removeItem('authUser');
    setAuthUser(u);
  }

  useEffect(() => {
    if (authUser) {
      axios.defaults.headers.common['Authorization'] = JSON.stringify(authUser);
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [ authUser ]);

  const contextValue = useMemo(
    () => ({
      authUser,
      persistUser
    }),
    [ authUser ]
  );

  return <AuthContext.Provider value={ contextValue }>
    { children }
  </AuthContext.Provider>;
};

export default AuthProvider;
