import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import axios from 'axios';


interface IAuthContext {
  userId: string | null;
  persistUserId: (id: string | null) => void;
}


const USER_ID_STORAGE_KEY = 'userId';


// @ts-ignore
const DEFAULT_AUTH_CONTEXT: IAuthContext = { userId: null, persistUserId: (id: string | null) => undefined };
const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [ userId, setUserId ] = useState(localStorage.getItem(USER_ID_STORAGE_KEY));

  function persistUserId(id: string | null): void {
    id ? localStorage.setItem(USER_ID_STORAGE_KEY, id) : localStorage.removeItem('userId')

    setUserId(id);
  }

  useEffect(() => {
    if (userId) {
      axios.defaults.headers.common['UserId'] = userId;
    } else {
      delete axios.defaults.headers.common['UserId'];
    }
  }, [ userId ]);

  const contextValue = useMemo(
    () => ({
      userId,
      persistUserId
    }),
    [ userId ]
  );

  return <AuthContext.Provider value={ contextValue }>
    { children }
  </AuthContext.Provider>;
};

export default AuthProvider;
