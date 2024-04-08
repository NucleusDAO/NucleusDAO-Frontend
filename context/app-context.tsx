'use client';

import { connectWallet } from '@/libs/store-aesdk-plugin';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export const AppContext = createContext({});

interface IAppProvider {
  children: ReactNode;
}

interface IUser {
  address: string;
  isConnected: boolean;
}

export interface IContext {
  user: IUser;
  handleConnectWallet: () => any;
}

const defaultUser = { address: '', isConnected: false };

export const AppProvider = ({ children }: IAppProvider) => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isDisConnecting, setIsDisConnecting] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>(defaultUser);
  const initialized = useRef(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    connectWallet
      .connect()
      .then((response: any) => {
        setUser(response);
        localStorage.setItem('user', JSON.stringify(response));
      })
      .catch((error: any) => toast.error(error.message || 'Cannot connect to wallet at the moment'))
      .finally(() => setIsConnecting(false));
  };

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    if (!initialized.current) {
      initialized.current = true;
      if (getUser) {
        handleConnectWallet();
      }
    }
  }, []);

  const handleDisconnect = () => {
    setIsDisConnecting(true);
    connectWallet
      .disconnect()
      .then(() => {
        setUser(defaultUser), localStorage.removeItem('user');
      })
      .finally(() => setIsDisConnecting(false));
  };

  const value: any = {
    handleConnectWallet,
    user,
    isConnecting,
    handleDisconnect,
    isDisConnecting,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
