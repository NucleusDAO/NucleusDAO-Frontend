'use client';

import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import {
  connectWallet,
  detectWallets,
} from '@/libs/ae-utils';
import ConfirmWalletDialog from './component/confirm-wallet';
import ConfirmDisconnectWallet from './component/confirm-disconnect';

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
  const [user, setUser] = useState<IUser>(defaultUser);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [walletInfo, setWalletInfo] = useState<{ info: any }>({ info: null });
  const [isScanningWallet, setIsScanningWallet] = useState<boolean>(false);
  const [userRejected, setUserRejected] = useState<boolean>(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState<boolean>(false);

  const initialized = useRef(false);

  const handleConnectWallet = async () => {
    setOpenModal(true);
    setIsScanningWallet(true)
    detectWallets().then((res) => {
      setWalletInfo((prev: any) => ({ ...prev, info: res }))
    }).finally(() => setIsScanningWallet(false));
    setTimeout(() => {
      setIsScanningWallet(false);
    }, 5000);
  };

  const handleConnect = () => {
    setIsConnecting(true);
    connectWallet()
      .then((res: any) => {
        if (res === 'Operation rejected by user') {
          setUserRejected(true);
        } else {
          setUser(res);
          setOpenModal(false);
          console.log(res, '-> res');
        }
      })
      .catch((error) => console.log(error, '-> error handle connect'))
      .finally(() => setIsConnecting(false));
  };

  useEffect(() => {
    const getUser = localStorage.getItem('user');
    if (!initialized.current) {
      initialized.current = true;
      if (getUser) {
        // handleConnectWallet();
      }
    }
  }, []);

  const handleDisconnect = async () => {
    setShowDisconnectModal(true);
    // setIsDisConnecting(true);
    // await aeSdk.disconnectWallet();
    // setUser(defaultUser);
    // localStorage.removeItem('user');
  };

  const value: any = {
    handleConnectWallet,
    user,
    isConnecting,
    handleDisconnect,
  };

  return (
    <AppContext.Provider value={value}>
      <ConfirmWalletDialog
        userRejected={userRejected}
        handleConnect={handleConnect}
        isScanningWallet={isScanningWallet}
        isConnecting={isConnecting}
        walletInfo={walletInfo}
        open={openModal}
        setOpen={setOpenModal}
      />
      <ConfirmDisconnectWallet setOpen={setShowDisconnectModal} open={showDisconnectModal} setUser={setUser} defaultUser={defaultUser} />
      {children}
    </AppContext.Provider>
  );
};
