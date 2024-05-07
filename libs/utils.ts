import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IProposal } from './types';
import { toast } from 'sonner';
import { IDAO } from '@/context/each-dao-context';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleChangeNumberInput = (
  value: string,
  setState: (arg: string) => void
) => {
  if (value.startsWith('0')) {
    setState('');
  } else {
    setState(value);
  }
};

export const handleMinus = (fieldName: string, form: any) => {
  form.clearErrors(fieldName);
  const initialValue = form.getValues(fieldName);
  form.setValue(fieldName, Number(initialValue) - 1);
};

export const handlePlus = (fieldName: string, form: any) => {
  form.clearErrors(fieldName);
  const initialValue = form.getValues(fieldName);
  form.setValue(fieldName, Number(initialValue) + 1);
};

export const handleChangeFormNumberInput = (
  fieldName: string,
  value: string,
  form: any
) => {
  form.clearErrors(fieldName);
  if (value.startsWith('0' || 0)) {
    form.setValue('duration', value[1] === '0' ? 1 : value[1]);
  } else {
    form.setValue(fieldName, Number(value));
  }
};

export const handleChangeFormDecimalInput = (
  fieldName: string,
  value: string,
  form: any
) => {
  form.clearErrors(fieldName);
  if (/^0\.\d+$/.test(value)) {
    form.setValue(fieldName, parseFloat(value));
  } else if (/^\d+(\.\d+)?$/.test(value)) {
    form.setValue(fieldName, parseFloat(value));
  } else {
    // Handle invalid input
    form.setError('value', 'Invalid value');
  }
};

export const encodeURI = (
  originalURI: string,
  keyValuePairs: string,
  otherKeyPairs?: string
) => {
  // Convert key-value pairs to a query string
  const queryString = Object.entries(keyValuePairs)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  // Combine the base URL and the query string
  const fullUrl = `${originalURI}/${encodeURIComponent(keyValuePairs)}${
    otherKeyPairs ? `/${otherKeyPairs}` : ''
  }`;

  // Replace %20 and spaces with +, make the string lowercase
  const modifiedUrl = fullUrl.replace(/(%20|\s)/g, '-');

  return modifiedUrl;
};

export const validateMembership = (membershipArray: { address: string }[]) => {
  return !membershipArray.some((item) => item.address === '');
};

export const validateDaoInfo = (obj: any) => {
  // Check if the object is empty
  if (Object.keys(obj).length === 0) {
    return true;
  }

  // Validate the 'style' key
  if (!obj.style) {
    return true;
  }

  // Validate the 'info' key
  if (!obj.info || !obj.info.daoName || !obj.info.daoUrl || !obj.info.about) {
    return true;
  }

  // Validate the 'socialMedia' key
  if (obj.info.socialMedia) {
    if (
      !Array.isArray(obj.info.socialMedia) ||
      obj.info.socialMedia.length === 0
    ) {
      // 'socialMedia' is not an array or it's an empty array
      return true;
    }
  }

  // All keys are filled, return true
  return false;
};

export const defaultDaoCreation = {
  style: '',
  info: {
    daoName: '',
    daoUrl: '',
    about: '',
    socialMedia: [{ type: '', link: '' }],
    logo: null,
    logoUrl: '',
  },
  members: [{ address: '' }],
  duration: 0,
  quorum: 50,
};

export const getStatus = (_proposal: IProposal | any) => {
  if (_proposal.isExecuted) {
    return 'Succeeded';
  }
  if (new Date(Number(_proposal.endTime)).valueOf() > Date.now().valueOf()) {
    return 'Active';
  } else {
    if (_proposal.votesFor > _proposal.votesAgainst) {
      return 'Pending';
    } else {
      return 'Failed';
    }
  }
};

export const defaultProposal = {
  value: {
    type: '0',
    description: '',
    targetWallet: '',
    value: '',
    logo: '',
    duration: 0,
    quorum: 0,
    socialMedia: [{ type: '', link: '' }],
  },
};

export function daysToMilliseconds(days: number) {
  return days * 24 * 60 * 60 * 1000;
}

export function millisecondsToDays(milliseconds: number) {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return milliseconds / millisecondsInADay;
}

export function getDaysFromMilliseconds(days: number): number {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  return days * millisecondsInADay;
}

export function formatDate(timestamp: number) {
  const date = new Date(Number(timestamp));
  const options: any = { day: '2-digit', month: 'short', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
}

export function getDuration(startTime: number, endTime: number) {
  const diff = endTime - startTime;

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

  return `${days}d ${hours}h ${minutes}m`;
}

interface IUpdateProposal {
  daoId: string;
  setCurrentDAO: (arg: IDAO) => void;
  getProposals: (arg: string) => any;
  getEachDAO: (arg: string) => any;
  setEachDAOProposal: any;
  getUsersActivities: (arg: string) => void;
  setMembersActivities: (arg: any) => void;
  proposal?: any;
  setCurrentProposal?: (arg: IProposal[]) => void;
}

export const updateGetProposal = async ({
  getEachDAO,
  daoId,
  setCurrentDAO,
  getProposals,
  setEachDAOProposal,
  getUsersActivities,
  setMembersActivities,
  setCurrentProposal,
}: IUpdateProposal) => {
  const dao = await getEachDAO(daoId);
  console.log(daoId, '-> pro');
  setCurrentDAO(dao);
  const proposals: IProposal[] = await getProposals(dao.contractAddress);
  setCurrentProposal && setCurrentProposal(proposals);
  setEachDAOProposal(
    proposals.reverse().map((proposal: IProposal) => {
      return {
        type: proposal.proposalType,
        status: getStatus(proposal),
        description: proposal.description,
        wallet: proposal.target.slice(0, 6) + '...' + proposal.target.slice(-4),
        duration: getDuration(proposal.startTime, proposal.endTime),
        totalVote: `${proposal.votesFor + proposal.votesAgainst}`,
        organisation: dao.name,
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
  const members = await getUsersActivities(dao.contractAddress);
  console.log({ members });
  setMembersActivities(members);
};

export const activities: { title: string; color: string; url: string }[] = [
  {
    title: 'Proposal',
    color: 'bg-[#444444]',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
  {
    title: 'DAO',
    color: 'bg-[#25B81B]',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
  {
    title: 'Vote',
    color: 'bg-[#DCBB0C]',
    url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
];

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

  const options: any = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
}

export function addDaysToCurrentDateAndFormat(days: number) {
  const currentDate = new Date();
  const newDate = new Date(currentDate.getTime() + days * 24 * 60 * 60 * 1000);
  return Math.floor(newDate.getTime() / 1000); // Convert milliseconds to seconds
}

export const removeExistingStorageItem = (key: string) => {
  const existingInfo =
    typeof window !== 'undefined' && localStorage.getItem(key);
  if (existingInfo) {
    localStorage.removeItem(key);
  }
};

function formatTime(milliseconds: number): string {
  const date = new Date(milliseconds);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function getTimeDifference(timestamp: number): string {
  const currentTime = Date.now();
  const difference = Math.abs(currentTime - timestamp);

  const days = Math.floor(difference / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (difference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((difference % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((difference % (60 * 1000)) / 1000);

  return `${days}d:${hours}h:${minutes}m:${seconds}s`;
}
