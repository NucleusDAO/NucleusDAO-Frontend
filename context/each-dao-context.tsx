'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContext } from './app-context';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { updateGetProposal } from '@/libs/utils';
import { IProposal } from '@/libs/types';
import ErrorFetchingComponent from '@/components/error-fetching-comp';

export const EachDaoContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export interface IDAO {
  name: string;
  description: string;
  image: string;
  socials: string[];
  votingTime: number;
  quorum: number;
  proposals: IProposal[];
  totalProposals: number;
  members: string[];
}

export const EachDaoContextProvider = ({ children }: IAppProvider) => {
  const router = useRouter();
  const pathname = usePathname();
  const [eachDAOProposal, setEachDAOProposal] = useState<any | null>(null);
  const [currentDAO, setCurrentDAO] = useState<IDAO | null>(null);
  const [membersActivities, setMembersActivities] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getProposals, getEachDAO, getUsersActivities } =
    useContext(AppContext);

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = urlParts[2];

  useEffect(() => {
    setIsLoading(true);
    if (urlParts.length >= 4) {
      (async () => {
        try {
          await updateGetProposal({
            getEachDAO,
            daoId,
            setCurrentDAO,
            getProposals,
            setEachDAOProposal,
            getUsersActivities,
            setMembersActivities,
          });
        } catch (error: any) {
          toast.error(error.message);
          console.error('Error fetching DAO:', error);
        } finally {
          setIsLoading(false); // Set loading state to false after fetching data
          return <ErrorFetchingComponent />;
        }
      })();
    }
  }, [daoId]);

  const value = {
    eachDAOProposal,
    membersActivities,
    isLoading,
    currentDAO,
    setCurrentDAO,
    setMembersActivities,
    setEachDAOProposal,
    setIsLoading,
  };

  return (
    <EachDaoContext.Provider value={value}>{children}</EachDaoContext.Provider>
  );
};
