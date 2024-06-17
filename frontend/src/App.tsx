import './App.scss'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AuthProvider from './modules/auth/providers/auth.provider.tsx';
import { UNotificationsProvider } from '@u-cat/u-notifications/dist/providers/u-notifications.provider';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { socket } from './sockets/socket.ts';
import { ConnectionState } from './sockets/ConnectionState.tsx';
import { Events } from './sockets/Events.tsx';
import { ConnectionManager } from './sockets/ConnectionManager.tsx';


function App() {
  const [ isConnected, setIsConnected ] = useState(socket.connected);
  const [ fooEvents, setFooEvents ] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents(previous => [ ...previous, value ]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('events', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('events', onFooEvent);
    };
  }, []);

  return (
    <>
      {/*<div className="App">*/}
      {/*  <ConnectionState isConnected={ isConnected }/>*/}
      {/*  <Events events={ fooEvents }/>*/}
      {/*  <ConnectionManager/>*/}
      {/*</div>*/}

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
