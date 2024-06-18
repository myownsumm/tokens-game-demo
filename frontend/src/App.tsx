import './App.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AuthProvider from './modules/auth/providers/auth.provider.tsx';
import { UNotificationsProvider } from '@u-cat/u-notifications/dist/providers/u-notifications.provider';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <>
      <BrowserRouter>
        <UNotificationsProvider>
          <AuthProvider>
            <Routes/>
          </AuthProvider>
        </UNotificationsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
