import React, {
  createContext,
  useContext, useEffect,
  useMemo,
  useState
} from 'react';
import { IMessage } from '../messages.typings.ts';
import { socket } from '../socket.ts';


interface IMessagesProviderContext {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  clearMessages: () => void;
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  // TODO onMessage(cb: (m: IMessage) => void): void;
  //  Implement a provider method allowing to bind reaction to a specific message based on it type / payload
}


const DEFAULT_MESSAGES_CONTEXT: IMessagesProviderContext = {
  messages: [],
  addMessage: () => undefined,
  clearMessages: () => undefined,
  connect: () => undefined,
  disconnect: () => undefined,
  isConnected: false,
};
const MessagesContext = createContext(DEFAULT_MESSAGES_CONTEXT);

export const useMessages = () => {
  return useContext(MessagesContext);
};

const MessagesProvider = ({ children }: React.PropsWithChildren) => {
  const [ isConnected, setIsConnected ] = useState(socket.connected);
  const [ messages, setMessages ] = useState<IMessage[]>([]);

  function addMessage(m: IMessage): void {
    setMessages([ ...messages, m ]);
  }

  function clearMessages(): void {
    setMessages([]);
  }

  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }

  const contextValue = useMemo(
    () => ({
      messages,
      addMessage,
      clearMessages,
      isConnected,
      connect,
      disconnect,
    }),
    [ messages ]
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value: string) {
      addMessage(JSON.parse(value));
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('events', onEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('events', onEvent);
    };
  }, []);

  return <MessagesContext.Provider value={ contextValue }>
    { children }
  </MessagesContext.Provider>;
};

export default MessagesProvider;
