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
import {
  IAppProvider,
  IConnectWalletContext,
  INewProposal,
  IProposal,
  InewDaoInfo,
} from '@/libs/types';
import {
  defaultDaoCreation,
  defaultProposal,
  getDuration,
  getStatus,
} from '@/libs/utils';
import { VIEW_DAO_URL } from '@/config/path';
import ErrorFetchingComponent from '@/components/error-fetching-comp';

export const AppContext = createContext<any>({});

export const AppContextProvider = ({ children }: IAppProvider) => {
  const { user } = useContext<IConnectWalletContext>(ConnectWalletContext);
  const [allDAOs, setAllDAOs] = useState<any[]>();
  const [daoLoading, setDaoLoading] = useState<boolean>(true);
  const [DAOsData, setDAOsData] = useState<any[]>([]);
  const [isProposalLoading, setIsProposalLoading] = useState<boolean>(true);
  const [allProposals, setAllProposals] = useState<IProposal[]>([]);
  const [newDaoInfo, setNewDaoInfo] = useState<InewDaoInfo>(defaultDaoCreation);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [totalProposals, setTotalProposals] = useState<number>(0);
  const [update, setUpdate] = useState<boolean>(false);
  const [isLoadingActivities, setIsLoadingActivities] =
    useState<boolean>(false);
  const [newProposalInfo, setNewProposalInfo] =
    useState<INewProposal>(defaultProposal);

  const getNewDaoInfo =
    typeof window !== 'undefined' && sessionStorage.getItem('new_dao');

  const getNewProposalInfo =
    typeof window !== 'undefined' && localStorage.getItem('new_proposal');

  useEffect(() => {
    if (getNewDaoInfo) {
      setNewDaoInfo(JSON.parse(getNewDaoInfo));
    }
  }, []);

  useEffect(() => {
    if (getNewProposalInfo) {
      setNewProposalInfo(JSON.parse(getNewProposalInfo));
    }
  }, []);

  const getActivities = async (address: string) => {
    setIsLoadingActivities(true);
    try {
      const activities: { proposalsCreated: number; voteCasted: number } =
        await getAUserActivitiesAcrossDAOs(address);
      console.log(activities, '->');
      setTotalProposals(Number(activities.proposalsCreated));
      setTotalVotes(Number(activities.voteCasted));
    } catch (error: any) {
      console.log(error, '-> error');
      toast.error(error.message);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  useEffect(() => {
    if (user.address || (update && user.address)) {
      getActivities(user.address);
    }
  }, [user.address, update]);

  console.log(update, '->completeProposal');

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
    } catch (error: any) {
      toast.error(error.message);
      return <ErrorFetchingComponent />;
    } finally {
      setDaoLoading(false);
    }
  };

  useEffect(() => {
    fetchDAOs();
  }, [user, update]);

  const fetchAllProposals = async () => {
    try {
      const proposals = await getAllProposals();
      console.log(proposals, '-> prop');
      setAllProposals(
        proposals.reverse().map((proposal: IProposal) => {
          return {
            type: proposal.proposalType,
            status: getStatus(proposal),
            description: proposal.description,
            wallet:
              proposal.target.slice(0, 6) + '...' + proposal.target.slice(-4),
            duration: getDuration(proposal.startTime, proposal.endTime),
            totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
            organisation: proposal.daoName,
            proposer:
              proposal.proposer.slice(0, 6) +
              '...' +
              proposal.proposer.slice(-4),
            id: proposal?.id,
            startTime: proposal.startTime,
            endTime: proposal.endTime,
            daoId: proposal.daoId,
            votesAgainst: proposal.votesAgainst,
            votesFor: proposal.votesFor,
            votes: proposal.votes,
            hasVoted: proposal.hasVoted,
          };
        })
      );
    } catch (error: any) {
      toast.error(error.message);
      return <ErrorFetchingComponent />;
    } finally {
      setIsProposalLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProposals();
  }, [update]);

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
    target: string,
    info: {
      name: string;
      socials: { name: string; url: string }[];
      image: string;
    }
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.createProposal(
      proposalType,
      description,
      value,
      target,
      info
    );
    const proposal = res.decodedResult;
    return proposal;
  };

  const getDAOs = async () => {
    const contract = await getNucleusDAO();
    console.log({ contract });
    const res = await contract.getDAOs();
    const daos = res.decodedResult;
    return daos;
  };

  const isUserMemberOfDAO = async (
    daoContractAddress: string,
    userAddress: string
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.isMember(userAddress);
    return res.decodedResult;
  };

  const getAUserActivitiesAcrossDAOs = async (userAddress: string) => {
    const contract = await getNucleusDAO();
    const res = await contract.getUserActivitiesAcrossDAOs(userAddress);
    const activities = res.decodedResult;
    return activities;
  };

  const getAllUsersActivities = async (daoContractAddress: string) => {
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

  const getAllProposals = async () => {
    const contract = await getNucleusDAO();
    const res = await contract.getAllProposals();
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

  const getProposal = async (
    daoContractAddress: string,
    proposalId: string
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.getProposal(proposalId);
    const proposal = res.decodedResult;

    return proposal;
  };

  const getEachDAO = async (id: string) => {
    const contract = await getNucleusDAO();
    const res = await contract.getDAO(id);
    const dao = res.decodedResult;
    return dao;
  };

  const deposit = async (daoContractAddress: string, amount: number) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.deposit({ amount });
    const response = res.decodedResult;
    return response;
  };

  const voteFor = async (proposalId: number, daoContractAddress: string) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.voteFor(proposalId);
    const result = res.decodedResult;
    return result;
  };

  const voteAgainst = async (
    proposalId: number,
    daoContractAddress: string
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.voteAgainst(proposalId);
    const result = res.decodedResult;
    return result;
  };

  const executeProposal = async (
    proposalId: number,
    daoContractAddress: string
  ) => {
    const contract = await getBasicDAO(daoContractAddress);
    const res = await contract.executeProposal(proposalId);
    const result = res.decodedResult;
    return result;
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
    newProposalInfo,
    setNewProposalInfo,
    voteFor,
    voteAgainst,
    getProposal,
    executeProposal,
    deposit,
    getAllProposals,
    isProposalLoading,
    fetchAllProposals,
    allProposals,
    getAllUsersActivities,
    getAUserActivitiesAcrossDAOs,
    totalVotes,
    totalProposals,
    getActivities,
    isLoadingActivities,
    setUpdate,
    isUserMemberOfDAO,
    // getEachProposal,
  };

  return (
    <ConnectWalletProvider>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ConnectWalletProvider>
  );
};
