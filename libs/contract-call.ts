import { getBasicDAO, getNucleusDAO } from './ae-utils';

interface ICreateDAO {
  name: string;
  id: string;
  description: string;
  image: string;
  socials: string[];
  initialMembers: string[];
  startingBalance: number;
  votingTime: number;
  quorum: number;
}

const getDAOs = async () => {
  const contract = await getNucleusDAO();
  const res = await contract.getDAOs();
  const daos = res.decodedResult;
  return daos;
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

const getAUserActivitiesAcrossDAOs = async (userAddress: string) => {
  const contract = await getNucleusDAO();
  const res = await contract.getUserActivitiesAcrossDAOs(userAddress);
  const activities = res.decodedResult;
  return activities;
};

const createDAO = async (payload: ICreateDAO) => {
  const contract = await getNucleusDAO();
  const res = await contract.createDAO(
    payload.name,
    payload.id,
    payload.description,
    payload.image,
    payload.socials,
    payload.initialMembers,
    payload.startingBalance,
    payload.votingTime,
    payload.quorum
  );
  const dao = res.decodedResult;
  return dao;
};

const getEachDAO = async (id: string) => {
  const contract = await getNucleusDAO();
  const res = await contract.getDAO(id);
  const dao = res.decodedResult;
  return dao;
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

const getProposalDetails = async (
  daoContractAddress: string,
  proposalId: string
) => {
  const contract = await getBasicDAO(daoContractAddress);
  const res = await contract.getProposal(proposalId);
  const proposal = res.decodedResult;

  return proposal;
};

export {
  getDAOs,
  getAllProposals,
  getAUserActivitiesAcrossDAOs,
  createDAO,
  getEachDAO,
  getProposals,
  getAllUsersActivities,
  getProposalDetails,
};
