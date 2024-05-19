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
import { boolean } from 'zod';

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
  const [memberLoading, setMemberLoading] = useState<boolean>(true);
  const [updateDAO, setUpdateDAO] = useState<boolean>(false);
  const isMember = currentDAO?.members?.includes(user.address);
  const [error, setError] = useState<string>('');
  const [memberHistory, setMemberHistory] = useState([]);
  const [proposalHistory, setProposalHistory] = useState([]);
  const [fundsHistory, setFundsHistory] = useState([]);

  const { getProposals, getEachDAO, getAllUsersActivities, isUserMemberOfDAO } =
    useContext(AppContext);

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const daoId = urlParts[2];

  const fetchEachDAO = async () => {
    try {
      const daos = await getEachDAO(daoId);
      setCurrentDAO(daos);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching data
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (urlParts.length >= 4) {
      setError('');
      fetchEachDAO();
      // (async () => {
      // try {
      //   const daos = await getEachDAO(daoId);
      //   console.log(daos, '-> DAOL');
      //   setCurrentDAO(daos);
      //   setIsLoading(false);
      // } catch (error: any) {
      //   toast.error(error.message);
      //   return <ErrorFetchingComponent />;
      // } finally {
      //   setIsLoading(false); // Set loading state to false after fetching data
      // }
      // })();
    }
  }, [daoId]);

  console.log(currentDAO, '->');

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
                proposer:
                  proposal.proposer.slice(0, 6) +
                  '...' +
                  proposal.proposer.slice(-4),
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

  useEffect(() => {
    setMemberLoading(true);
    if (!!currentDAO) {
      (async () => {
        try {
          const members = await getAllUsersActivities(
            currentDAO.contractAddress
          );
          setMembersActivities(members);
          setMemberLoading(false);
        } catch (error: any) {
          toast.error(error.message);
          return <ErrorFetchingComponent />;
        } finally {
          setMemberLoading(false); // Set loading state to false after fetching data
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
    memberLoading,
    isProposalLoading,
    setIsLoading,
    setUpdateDAO,
    fetchEachDAO,
    error,
    setError,
    setMemberHistory,
    memberHistory,
    proposalHistory,
    setProposalHistory,
    fundsHistory,
    setFundsHistory,
  };

  return (
    <EachDaoContext.Provider value={value}>{children}</EachDaoContext.Provider>
  );
};
