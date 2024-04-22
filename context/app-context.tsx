import { ReactNode, createContext, useState } from 'react';
import { ConnectWalletProvider } from './connect-wallet-context';

export const AppContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: IAppProvider) => {
  const [sample, setSample] = useState<string>('');

  const handleSample = () => {
    setSample('testing');
  };

  const value = {
    sample,
    handleSample,
  };

  return (
    <ConnectWalletProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ConnectWalletProvider>
  );
};
