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
import { getStatus } from '@/libs/utils';
import { IProposal } from '@/libs/types';

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

  console.log(daoId, '-? dao ID')

  useEffect(() => {
    if (urlParts.length >= 4) {
      setIsLoading(true);
      (async () => {
        try {
            const dao = await getEachDAO(daoId);
            setCurrentDAO(dao);
            const proposals: IProposal[] = await getProposals(
              dao.contractAddress
            );
            // console.log(proposals, '-> proposals')
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
                  organisation: dao.name,
                  id: proposal.id.toString(),
                };
              })
            );
            const members = await getUsersActivities(dao.contractAddress);
            console.log({ members });
            setMembersActivities(members);
        } catch (error: any) {
          toast.error(error.message);
          console.error('Error fetching DAO:', error);
        } finally {
          setIsLoading(false); // Set loading state to false after fetching data
        }
      })();
    }
  }, [daoId]);

  function getDuration(startTime: number, endTime: number) {
    const diff = endTime - startTime;

    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

    return `${days}d ${hours}h ${minutes}m`;
  }

  const value = {
    eachDAOProposal,
    membersActivities,
    isLoading,
    currentDAO,
  };

  return (
    <EachDaoContext.Provider value={value}>{children}</EachDaoContext.Provider>
    );
};
