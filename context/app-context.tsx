import { ReactNode, createContext, useEffect, useState } from 'react';
import { ConnectWalletProvider } from './connect-wallet-context';
import { getNucleusDAO, getBasicDAO } from '@/libs/ae-utils';

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
  startTime: number;
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
  const [allDAOs, setAllDAOs] = useState<any[]>();
  const [DAOs, setDAOs] = useState<any[]>();
  const [currentDAO, setCurrentDAO] = useState<IDAO | null>(null);
  const [currentDAOId, setCurrentDAOId] = useState<string | null>(null);
  const [sample, setSample] = useState<string>('');

  useEffect(() => {
    getAllDaos();
  }, []);

  useEffect(() => {
    console.log('Current dao id updated', currentDAOId);
    if (currentDAOId) {
      console.log('Getting dao');
      getDAO(currentDAOId).then((dao: IDAO) => {
        setCurrentDAO(dao);
      });
    }
  }, [currentDAOId]);

  const getAllDaos = async () => {
    getDAOs().then((res: any) => {
      for (let i = 0; i < res.length; i++) {
        let dao = res[i];
        for (let key in dao) {
          if (typeof dao[key] == 'bigint') {
            dao[key] = Number(dao[key]);
          }
        }
      }
      setAllDAOs(res);
      setDAOs(res);
    });
  };

  const createDAO = async (
    name: string,
    id: string,
    description: string,
    image: string,
    socials: string[],
    initialMembers: string[],
    startingBalance: number,
    votingTime: number,
    quorum: number
  ) => {
    const contract = await getNucleusDAO();
    const res = await contract.createDAO(
      name,
      id,
      description,
      image,
      socials,
      initialMembers,
      startingBalance,
      votingTime,
      quorum
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

  const getUsersActivities = async (daoContractAddress: string) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.getUsersActivities();
    const proposals = res.decodedResult;
    for (let i = 0; i < proposals.length; i++) {
      let proposal = proposals[i];
      for (let key in proposal) {
        if (typeof proposal[key] == 'bigint') {
          proposal[key] = Number(proposal[key]);
        }
      }
    }
    return proposals;
  };

  const getProposals = async (daoContractAddress: string) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.getProposals();
    const proposals = res.decodedResult;
    for (let i = 0; i < proposals.length; i++) {
      let proposal = proposals[i];
      for (let key in proposal) {
        if (typeof proposal[key] == 'bigint') {
          proposal[key] = Number(proposal[key]);
        }
      }
    }
    return proposals;
  };

  const getDAO = async (id: string) => {
    const contract = await getNucleusDAO();
    const res = await contract.getDAO(id);
    const dao = res.decodedResult;
    return dao;
  };

  const value = {
    DAOs,
    createDAO,
    setCurrentDAOId,
    currentDAO,
    createProposal,
    getProposals,
  };

  return (
    <ConnectWalletProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ConnectWalletProvider>
  );
};
