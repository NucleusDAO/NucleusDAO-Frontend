import {
  aePrice,
  createUser,
  getNotifications,
  getProposals,
  getUser,
  updateUser,
} from '@/config/apis';
import { AE_PRICE_KEY, EACH_USER, NOTIFICATIONS, PROPOSALS } from '@/libs/key';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext } from 'react';
import { ConnectWalletContext } from './connect-wallet-context';
import { IConnectWalletContext, ICreateUser } from '@/libs/types';
import { toast } from 'sonner';

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
    retry: false,
  });

  const {
    data: proposals,
    isError: isProposalError,
    error: proposalErrorMessage,
    isLoading: isLoadingProposal,
  } = useQuery({
    queryKey: [PROPOSALS],
    queryFn: getProposals,
  });

  const {
    data: notifications,
    isError: isNotificationError,
    error: notificationErrorMessage,
    isLoading: isLoadingNotification,
  } = useQuery({
    queryKey: [NOTIFICATIONS],
    queryFn: () => getNotifications(address),
    enabled: !!address,
  });

  const { mutate: mutateUsers, isPending: isMutatingUsers } = useMutation({
    mutationFn: eachUser
      ? (payload: ICreateUser) => updateUser(payload, address)
      : createUser,
    onSuccess: (response: any) =>
      toast.success(response.message || 'User profile updated successfully.'),
    onError: (error: any) => toast.error(error.message),
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
    proposals,
    isProposalError,
    proposalErrorMessage,
    isLoadingProposal,
  };
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
