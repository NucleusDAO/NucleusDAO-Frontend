import {
  aePrice,
  createUser,
  fetchTransactionHistory,
  getNotifications,
  getUser,
  updateUser,
} from '@/config/apis';
import { AE_PRICE_KEY, EACH_USER, NOTIFICATIONS } from '@/libs/key';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import { ConnectWalletContext } from './connect-wallet-context';
import { IConnectWalletContext, ICreateUser } from '@/libs/types';
import { toast } from 'sonner';
import { EachDaoContext } from './each-dao-context';
import { AppContext } from './app-context';

export const ApiContext = createContext<any>({});

interface IApiProvider {
  children: ReactNode;
}

export const ApiContextProvider = ({ children }: IApiProvider) => {
  const { network } = useContext(AppContext);
  const { currentDAO } = useContext(EachDaoContext);
  const queryClient: any = useQueryClient();
  const {
    user: { address },
  } = useContext<IConnectWalletContext>(ConnectWalletContext);

  const {
    data: getAEPrice,
    isError: isAePriceError,
    error: aePriceErrorMessage,
    isLoading: loadingAePrice,
  } = useQuery({
    queryKey: [AE_PRICE_KEY, network],
    queryFn: aePrice,
  });

  const {
    data: eachUser,
    isError: isEachUserError,
    error: eachUserErrorMessage,
    isLoading: isLoadingEachUser,
  } = useQuery({
    queryKey: [EACH_USER, network],
    queryFn: () => getUser(address),
    enabled: !!address,
  });

  const {
    data: transactionHistory,
    isError: isTransactionHistoryError,
    error: transactionHistoryError,
    isLoading: isLoadingTransactionHistory,
  } = useQuery({
    queryKey: [EACH_USER, currentDAO?.id, network],
    queryFn: () => fetchTransactionHistory(currentDAO?.id),
    enabled: !!currentDAO?.id,
  });

  const {
    data: notifications,
    isError: isNotificationError,
    error: notificationErrorMessage,
    isLoading: isLoadingNotification,
  } = useQuery({
    queryKey: [NOTIFICATIONS, network],
    queryFn: () => getNotifications(address),
    enabled: !!address && !!eachUser,
  });

  const { mutate: mutateUsers, isPending: isMutatingUsers } = useMutation({
    mutationFn: !!eachUser
      ? (payload: ICreateUser) => updateUser(payload, address)
      : (payload: ICreateUser) => createUser(payload),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({ queryKey: [EACH_USER] });
      toast.success('User profile updated successfully.');
    },
    onError: (error: any) =>
      toast.error(error.response.data.message || 'Email has been in use'),
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
    mutateUsers,
    isMutatingUsers,
    notifications,
    isNotificationError,
    isLoadingNotification,
    notificationErrorMessage,
    transactionHistory,
    transactionHistoryError,
    isTransactionHistoryError,
    isLoadingTransactionHistory,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
