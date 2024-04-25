import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { ConnectWalletContext, ConnectWalletProvider } from './connect-wallet-context';
import { getNucleusDAO, getBasicDAO } from '@/libs/ae-utils';
import { toast } from 'sonner';
import AllDaos from '@/components/all-daos';
import { IConnectWalletContext } from '@/libs/types';

export const AppContext = createContext<any>({});

interface IAppProvider {
  children: ReactNode;
}

export interface IProposal {
  id: number;
  proposal: string;
  proposalType: string;
  description: string;
  value: number;
  target: string;
  endTime: number;
  votesFor: number;
  votesAgainst: number;
  isExecuted: boolean;
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

export const AppContextProvider = ({ children }: IAppProvider) => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [allDAOs, setAllDAOs] = useState<any[]>();
  // const [DAOs, setDAOs] = useState<any[]>([]);
  const [currentDAO, setCurrentDAO] = useState<IDAO | null>(null);
  const [currentDAOId, setCurrentDAOId] = useState<string | null>(null);
  const [daoLoading, setDaoLoading] = useState<boolean>(true);
  const [DAOsData, setDAOsData] = useState<any[]>([]);

  console.log(allDAOs, '-> allDAOs')

  useEffect(() => {
    console.log('Current dao id updated', currentDAOId);
    if (currentDAOId) {
      getDAO(currentDAOId).then((dao: IDAO) => {
        setCurrentDAO(dao);
      });
    }
  }, [currentDAOId]);

  const getAllDaos = async () => {
    return getDAOs().then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let dao = res[i];
        for (let key in dao) {
          if (typeof dao[key] == 'bigint') {
            dao[key] = Number(dao[key]);
          }
        }
      }
      setAllDAOs(res);
      // setDAOs(res);
      return res;
    });
  };

  console.log(DAOsData, '-> data')

  useEffect(() => {
    const fetchDAOs = async () => {
      try {
        const allDAOs: any = await getAllDaos();
        console.log(allDAOs, '-> all daos')
        if (allDAOs) {
          setDAOsData(
            allDAOs.map((dao: any) => {
              return {
                organisation: dao.name,
                image: dao.image,
                activeMember: dao.members.length.toString(),
                activeProposal: `${dao.proposals}(${dao.activeProposals})`,
                description: dao.description,
                members: dao.members,
                votes: '',
                url: `https://nucleusdao.com/dao/${dao.name
                  .toLowerCase()
                  .replace(/\s/g, '-')}`,
              };
            })
          );
          setDaoLoading(false);
        }
      } catch (error) {
        toast.error('Error fetching DAOs');
      }
    };
    fetchDAOs();
  }, [user.isConnected]);

  const createDAO = async (
    name: string,
    description: string,
    image: string,
    socials: string[],
    initialMembers: string[],
    startingBalance: number
  ) => {
    const contract = await getNucleusDAO();
    const res = await contract.createDAO(
      name,
      description,
      image,
      socials,
      initialMembers,
      startingBalance
    );
    console.log({ res });
    const dao = res.decodedResult;
    return dao;
  };

  const createProposal = async (
    daoContractAddress: string,
    proposalType: string,
    description: string,
    value: number,
    target: string
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.createDAO(
      proposalType,
      description,
      value,
      target
    );
    const proposal = res.decodedResult;
    return proposal;
  };

  const getDAOs = async () => {
    const contract = await getNucleusDAO();
    const res = await contract.getDAOs();
    const daos = res.decodedResult;
    return daos;
  };

  const getProposals = async (daoContractAddress: string) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.getProposals();
    const daos = res.decodedResult;
    return daos;
  };

  const getDAO = async (id: string) => {
    const contract = await getNucleusDAO();
    const res = await contract.getDAO(id);
    const dao = res.decodedResult;
    return dao;
  };

  const value = {
    // DAOs,
    createDAO,
    setCurrentDAOId,
    currentDAO,
    createProposal,
    getProposals,
    daoLoading,
    DAOsData,
  };

  return (
    <ConnectWalletProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ConnectWalletProvider>
  );
};
