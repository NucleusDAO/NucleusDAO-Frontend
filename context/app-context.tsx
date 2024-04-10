'use client';

import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import {
  IS_MOBILE,
  connectWallet,
  detectWallets,
} from '@/libs/ae-utils';
import ConfirmWalletDialog from './component/confirm-wallet';
import ConfirmDisconnectWallet from './component/confirm-disconnect';
import { useSearchParams } from 'next/navigation';

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
  const searchParams = useSearchParams();
  const address = searchParams.get('address') || '';

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
        !IS_MOBILE && handleConnect();
      }
    }
  }, []);

  useEffect(() => {
    if (address) {
      setUser({ address, isConnected: true });
      localStorage.setItem('user', JSON.stringify({ address, isConnected: true }))
    }
  }, [address])

  const handleDisconnect = () => {
    setShowDisconnectModal(true);
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
