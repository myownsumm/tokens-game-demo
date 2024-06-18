import React, {
  createContext,
  useContext,
  useMemo,
  useState
} from 'react';
import { IMessage } from '../messages.typings.ts';


interface IMessagesProviderContext {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  clearMessages: () => void;
}


const DEFAULT_MESSAGES_CONTEXT: IMessagesProviderContext = {
  messages: [],
  addMessage: () => undefined,
  clearMessages: () => undefined
};
const MessagesContext = createContext(DEFAULT_MESSAGES_CONTEXT);

export const useMessages = () => {
  return useContext(MessagesContext);
};

const MessagesProvider = ({ children }: React.PropsWithChildren) => {
  const [ messages, setMessages ] = useState<IMessage[]>([]);

  function addMessage(m: IMessage): void {
    setMessages([ ...messages, m ]);
  }

  function clearMessages(): void {
    setMessages([]);
  }

  const contextValue = useMemo(
    () => ({
      messages,
      addMessage,
      clearMessages
    }),
    [ messages ]
  );

  return <MessagesContext.Provider value={ contextValue }>
    { children }
  </MessagesContext.Provider>;
};

export default MessagesProvider;
