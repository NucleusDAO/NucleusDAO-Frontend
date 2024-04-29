'use client';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AppContext, IProposal } from './app-context';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { getStatus } from '@/libs/utils';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    getProposals,
    getEachDAO,
  } = useContext(AppContext);

  const urlParts = pathname.split('/'); // Split the URL by "/"
  const secondParts = urlParts[2];

  useEffect(() => {
    (async () => {
      try {
        const daoId = 'Hexdee DAO' || secondParts;
        if (daoId) {
          const dao = await getEachDAO(daoId);
          setCurrentDAO(dao);
          await getProposals(dao.contractAddress).then(
            (proposals: IProposal[]) => {
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
                    duration: new Date().toLocaleDateString('en-Gb', {
                      day: 'numeric',
                    }),
                    totalVote: `${proposal.votesFor} + ${proposal.votesAgainst}`,
                    organisation: dao.name,
                    id: proposal.id.toString(),
                  };
                })
              );
            }
          );
          setIsLoading(false);
        } else {
          router.back();
        }
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error.message);
        console.error('Error fetching DAO:', error);
      }
    })();
  }, [secondParts]);

  const value = {
    eachDAOProposal,
    isLoading,
    currentDAO,
  };

  return (
      <EachDaoContext.Provider value={value}>{children}</EachDaoContext.Provider>
  );
};
