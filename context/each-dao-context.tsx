'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContext } from './app-context';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { getDuration, getStatus } from '@/libs/utils';
import { IConnectWalletContext, IProposal } from '@/libs/types';
import ErrorFetchingComponent from '@/components/error-fetching-comp';
import { ConnectWalletContext } from './connect-wallet-context';

export const EachDaoContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export interface IDAO {
  name: string;
  contractAddress: string;
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
  const pathname = usePathname();
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [eachDAOProposal, setEachDAOProposal] = useState<any | null>(null);
  const [currentDAO, setCurrentDAO] = useState<IDAO | null>(null);
  const [membersActivities, setMembersActivities] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProposalLoading, setIsProposalLoading] = useState<boolean>(true);
  const [isMemberLoading, setIsMemberLoading] = useState<boolean>(true);
  const isMember = currentDAO?.members?.includes(user.address);

  const { getProposals, getEachDAO, getAllUsersActivities } =
    useContext(AppContext);

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = urlParts[2];

  useEffect(() => {
    setIsLoading(true);
    if (urlParts.length >= 4) {
      (async () => {
        try {
          const daos = await getEachDAO(daoId);
          console.log(daos, '-> DAOL');
          setCurrentDAO(daos);
          setIsLoading(false);
          // await updateGetProposal({
          //   getEachDAO,
          //   daoId,
          //   setCurrentDAO,
          //   getProposals,
          //   setEachDAOProposal,
          //   getUsersActivities,
          //   setMembersActivities,
          // });
        } catch (error: any) {
          toast.error(error.message);
          return <ErrorFetchingComponent />;
        } finally {
          setIsLoading(false); // Set loading state to false after fetching data
        }
      })();
    }
  }, [daoId]);

  console.log(!!currentDAO, '->current dao');

  useEffect(() => {
    setIsProposalLoading(true);
    if (!!currentDAO) {
      (async () => {
        try {
          const proposals: IProposal[] = await getProposals(
            currentDAO.contractAddress
          );
          setEachDAOProposal(
            proposals.map((proposal: IProposal) => {
              return {
                type: proposal.proposalType,
                status: getStatus(proposal),
                description: proposal.description,
                wallet:
                  proposal.target.slice(0, 6) +
                  '...' +
                  proposal.target.slice(-4),
                duration: getDuration(proposal.startTime, proposal.endTime),
                totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
                organisation: currentDAO.name,
                id: Number(proposal.id).toString(),
                startTime: proposal.startTime,
                endTime: proposal.endTime,
                votesAgainst: proposal.votesAgainst,
                votesFor: proposal.votesFor,
                votes: proposal.votes,
                hasVoted: proposal.hasVoted,
              };
            })
          );
          setIsProposalLoading(false);
        } catch (error: any) {
          toast.error(error.message);
          return <ErrorFetchingComponent />;
        } finally {
          setIsProposalLoading(false); // Set loading state to false after fetching data
        }
      })();
    }
  }, [currentDAO]);

  console.log(eachDAOProposal, '-> eachDAOProposal');

  useEffect(() => {
    setIsMemberLoading(true);
    if (!!currentDAO) {
      (async () => {
        try {
          const members = await getAllUsersActivities(
            currentDAO.contractAddress
          );
          setMembersActivities(members);
          setIsMemberLoading(false);
        } catch (error: any) {
          toast.error(error.message);
          return <ErrorFetchingComponent />;
        } finally {
          setIsMemberLoading(false); // Set loading state to false after fetching data
        }
      })();
    }
  }, [currentDAO]);

  const value = {
    eachDAOProposal,
    membersActivities,
    isLoading,
    currentDAO,
    setCurrentDAO,
    setMembersActivities,
    setEachDAOProposal,
    isMember,
    isMemberLoading,
    isProposalLoading,
    setIsLoading,
  };

  return (
    <EachDaoContext.Provider value={value}>{children}</EachDaoContext.Provider>
  );
};
