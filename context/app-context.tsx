import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ConnectWalletContext,
  ConnectWalletProvider,
} from './connect-wallet-context';
import { getNucleusDAO, getBasicDAO } from '@/libs/ae-utils';
import { toast } from 'sonner';
import { IConnectWalletContext, InewDaoInfo } from '@/libs/types';
import { defaultDaoCreation } from '@/libs/utils';
import { VIEW_DAO_URL } from '@/config/path';

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
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [allDAOs, setAllDAOs] = useState<any[]>();
  const [daoLoading, setDaoLoading] = useState<boolean>(true);
  const [DAOsData, setDAOsData] = useState<any[]>([]);
  const [newDaoInfo, setNewDaoInfo] = useState<InewDaoInfo>(defaultDaoCreation);
  const getNewDaoInfo =
    typeof window !== 'undefined' && localStorage.getItem('new_dao');

  useEffect(() => {
    if (getNewDaoInfo) {
      setNewDaoInfo(JSON.parse(getNewDaoInfo));
    }
  }, []);

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
      return res;
    });
  };

  const updateNewDaoInfo = (data: any) => {
    setNewDaoInfo(data);
  };

  const fetchDAOs = async () => {
    try {
      const allDAOs: any = await getAllDaos();
      if (allDAOs) {
        setDAOsData(
          allDAOs.map((dao: any) => {
            return {
              organisation: dao.name,
              image: dao.image,
              activeMember: dao.members.length.toString(),
              activeProposal: `${dao.totalProposals}(${dao.activeProposals})`,
              description: dao.description,
              members: dao.members,
              votes: dao.totalVotes,
              url: encodeURI(
                window.location.origin +
                  VIEW_DAO_URL +
                  '/' +
                  dao.id +
                  '/dashboard'
              ),
            };
          })
        );
        setDaoLoading(false);
      }
    } catch (error) {
      toast.error('Error fetching DAOs');
    }
  };

  useEffect(() => {
    // const fetchDAOs = async () => {
    //   try {
    //     const allDAOs: any = await getAllDaos();
    //     if (allDAOs) {
    //       setDAOsData(
    //         allDAOs.map((dao: any) => {
    //           return {
    //             organisation: dao.name,
    //             image: dao.image,
    //             activeMember: dao.members.length.toString(),
    //             activeProposal: `${dao.totalProposals}(${dao.activeProposals})`,
    //             description: dao.description,
    //             members: dao.members,
    //             votes: dao.totalVotes,
    //             url: encodeURI(
    //               window.location.origin +
    //                 VIEW_DAO_URL +
    //                 '/' +
    //                 dao.id +
    //                 '/dashboard'
    //             ),
    //           };
    //         })
    //       );
    //       setDaoLoading(false);
    //     }
    //   } catch (error) {
    //     toast.error('Error fetching DAOs');
    //   }
    // };
    fetchDAOs();
  }, [user]);

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
    const res = await contract.getAllMembersActivities();
    const activities = res.decodedResult;
    for (let i = 0; i < activities.length; i++) {
      let activity = activities[i];
      for (let key in activity) {
        if (typeof activity[key] == 'bigint') {
          activity[key] = Number(activity[key]);
        }
      }
    }
    return activities;
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

  const getEachDAO = async (id: string) => {
    const contract = await getNucleusDAO();
    const res = await contract.getDAO(id);
    const dao = res.decodedResult;
    return dao;
  };

  const value = {
    createDAO,
    createProposal,
    getProposals,
    daoLoading,
    DAOsData,
    updateNewDaoInfo,
    newDaoInfo,
    getEachDAO,
    getUsersActivities,
    fetchDAOs,
  };

  return (
    <ConnectWalletProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ConnectWalletProvider>
  );
};
