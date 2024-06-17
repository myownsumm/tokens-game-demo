import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';


interface IAuthContext {
  token: string | null;
  persistToken: (token: string | null, remember?: boolean) => void;
}


const DEFAULT_AUTH_CONTEXT: IAuthContext = { token: null, persistToken: () => undefined };
const AuthContext = createContext(DEFAULT_AUTH_CONTEXT);

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  // const { addNotification } = useNotifications();
  // const navigate = useNavigate();

  // Component content goes here
  const [ token, setToken ] = useState(localStorage.getItem('token'));

  function persistToken(token: string | null, remember = true): void {
    if (remember && token) {
      localStorage.setItem('token', token);
    }

    if (!token) {
      localStorage.removeItem('token')
    }

    setToken(token);
  }

  useEffect(() => {
    // TODO. start using Axios for http requests
    if (token) {
      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      // delete axios.defaults.headers.common['Authorization'];
    }
  }, [ token ]);

  // Check if Auth user is still valid
  useEffect(() => {
    if (!token) {
      return;
    }

    // const url = `${ process.env.NX_PUBLIC_USERS_API_URL }/users/me`;

    // axios.request({ method: 'GET', url })
    //   .then(
    //     response => {
    //       // TODO. use this User data for something? ACL/RBAC? avatar?
    //     }
    //   )
    //   .catch(err => {
    //     if (err.response.status === 404) {
    //       persistToken(null);
    //       navigate('/');
    //     }
    //     addNotification(UNotificationColor.danger, 'Problem occurred while trying to validate User authenticated.');
    //   })
  }, [ token ]);

  const contextValue = useMemo(
    () => ({
      token,
      persistToken
    }),
    [ token ]
  );

  return <AuthContext.Provider value={ contextValue }>
    { children }
  </AuthContext.Provider>;
};

export default AuthProvider;
