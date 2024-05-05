import { aePrice, getUser } from '@/config/apis';
import { AE_PRICE_KEY, EACH_USER } from '@/libs/key';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import { ConnectWalletContext } from './connect-wallet-context';
import { IConnectWalletContext } from '@/libs/types';

export const ApiContext = createContext<any>({});

interface IApiProvider {
  children: ReactNode;
}

export const ApiContextProvider = ({ children }: IApiProvider) => {
  const {
    user: { address },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const {
    data: getAEPrice,
    isError: isAePriceError,
    error: aePriceErrorMessage,
    isLoading: loadingAePrice,
  } = useQuery({
    queryKey: [AE_PRICE_KEY],
    queryFn: aePrice,
  });

  const {
    data: eachUser,
    isError: isEachUserError,
    error: eachUserErrorMessage,
    isLoading: isLoadingEachUser,
  } = useQuery({
    queryKey: [EACH_USER],
    queryFn: () => getUser(address),
    enabled: !!address,
  });

  const value = {
    getAEPrice,
    isAePriceError,
    aePriceErrorMessage,
    loadingAePrice,
    eachUser,
    isEachUserError,
    eachUserErrorMessage,
    isLoadingEachUser,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
