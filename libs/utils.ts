import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IExecuteAction, IProposal } from './types';
import { rate } from '@/config/dao-config';
import { isSafariBrowser } from './ae-utils';
import { toast } from 'sonner';

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
    form.setValue(fieldName, value[1] === '0' ? 1 : value[1]);
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

export const validateMembership: any = (
  membershipArray: { address: string }[]
) => {
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
    if (
      _proposal.votesFor > _proposal.votesAgainst &&
      new Date(Number(_proposal.endTime)).valueOf() <= Date.now().valueOf()
    ) {
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
  if (milliseconds) {
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    return milliseconds / millisecondsInADay;
  } else {
    return 0;
  }
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

export function formatISODate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function getDuration(startTime: number, endTime: number) {
  const diff = endTime - startTime;

  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

  return `${days}d ${hours}h ${minutes}m`;
}

export const activities: {
  title: string;
  color: string;
  url: string;
  options: { title: string; instruction: string[] };
}[] = [
  {
    title: 'Proposal',
    color: 'bg-[#444444]',
    options: {
      title: 'Create a Proposal:',
      instruction: [
        "Go to your DAO's dashboard",
        "Select 'Create Proposal'",
        'Choose a predefined proposal template or create a custom one',
        "Fill in the details and hit 'Submit.'",
      ],
    },
    url: '',
  },
  {
    title: 'DAO',
    color: 'bg-[#25B81B]',
    options: {
      title: 'Create a DAO:',
      instruction: [
        'Go to your personal dashboard',
        "Click 'Create DAO'.",
        'Customize the governance settings and provide required DAO details.',
        "Hit 'Create' to finalize the DAO creation.",
      ],
    },
    url: '',
  },
  {
    title: 'Vote',
    color: 'bg-[#DCBB0C]',
    options: {
      title: 'Vote on a Proposal:',
      instruction: [
        'Ensure you are a member of the DAO with the proposal.',
        'Access the proposal and cast your vote.',
        "You're all set",
      ],
    },
    url: '',
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

export function convertDays(days: number) {
  if (days) {
    const totalSeconds = days * 24 * 60 * 60;
    const d = Math.floor(totalSeconds / (24 * 60 * 60));
    const h = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const m = Math.floor((totalSeconds % (60 * 60)) / 60);
    const s = totalSeconds % 60;

    return `${d}d:${h}h:${m}m:${s.toFixed(0)}s`;
  } else {
    return 0;
  }
}

export function getTimeDifference(
  timestamp: string | number,
  setCountdownString: (arg: string) => void
): any {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    let timeDifference = Number(timestamp) - currentTime;

    // Check if the countdown has reached zero
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      setCountdownString('voting time has ended!');
      return;
    }

    // Calculate time components
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsLeft = Math.floor((timeDifference % (1000 * 60)) / 1000);

    // Format the countdown string
    const formattedString = `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    setCountdownString(formattedString);
  }, 1000);

  return () => clearInterval(intervalId);
}

export function wait() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

export const capitalizeFirstLetter = (str: string) => {
  const capitalized = str && str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
};

export const percentageChangeRate = (data: any) => {
  if (data.length < 2) {
    // Not enough data points to calculate percentage change
    return 0;
  }

  const lastValue = Number(data[data.length - 1]?.value) || 0;
  const secondToLastValue = Number(data[data.length - 2]?.value) || 0;
  let percentageChange;

  if (secondToLastValue !== 0) {
    const difference = lastValue - secondToLastValue;
    percentageChange = (difference / Math.abs(secondToLastValue)) * 100;
  } else {
    percentageChange = lastValue === 0 ? 0 : 100; // If the second to last value is 0 and last value is not 0, it's a 100% increase
  }

  return Math.ceil(percentageChange);
};

export const convertCurrency = (amount: number, price: number) => {
  const formatAmount = Number(amount);
  const ae = Number(formatAmount) / Number(1000000000000000000);

  // Convert the result to a floating point number
  const aeFloat: number = Number(ae);

  const usdValue: number = aeFloat * Number(price || rate);
  return { ae: aeFloat, usd: usdValue.toFixed(5) };
};

export function isMobile() {
  const regex =
    /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent);
}

function isObjectEmpty<T extends object>(obj: T): boolean {
  return Object.keys(obj).length === 0;
}

export function getIsConnected() {
  if (typeof window !== 'undefined') {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (isObjectEmpty(currentUser) || !isMobile() || !isSafariBrowser()) {
      return null;
    }
    return currentUser;
  }
}

export async function executeAction({
  setPending,
  action,
  payload,
  address,
  mutate,
}: IExecuteAction) {
  if (isMobile() || isSafariBrowser()) {
    setPending(true);
    try {
      await action(payload, address);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  } else {
    mutate(payload);
  }
}
