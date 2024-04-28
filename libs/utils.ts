import { IProposal } from "@/context/app-context"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleChangeNumberInput = (value: string, setState: (arg: string) => void) => {
  if (value.startsWith('0')) {
      setState('')
  } else {
      setState(value)
  }
}

export const handleMinus = (fieldName: string, form: any) => {
  form.clearErrors(fieldName)
  const initialValue = form.getValues(fieldName)
  form.setValue(fieldName, Number(initialValue) - 1)
}

export const handlePlus = (fieldName: string, form: any) => {
  form.clearErrors(fieldName)
  const initialValue = form.getValues(fieldName)
  form.setValue(fieldName, Number(initialValue) + 1)
}

export const handleChangeFormNumberInput = (fieldName: string, value: string, form: any) => {
  form.clearErrors(fieldName)
  if (value.startsWith('0' || 0)) {
      form.setValue('duration', value[1] === '0' ? 1 : value[1]);
  } else {
      form.setValue(fieldName, Number(value))
  }
}

export const encodeURI = (originalURI: string, keyValuePairs: string, otherKeyPairs?: string) => {
  // Convert key-value pairs to a query string
  const queryString = Object.entries(keyValuePairs)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  // Combine the base URL and the query string
  const fullUrl = `${originalURI}/${encodeURIComponent(keyValuePairs)}${otherKeyPairs ? `/${otherKeyPairs}` : ''}`;

  // Replace %20 and spaces with +, make the string lowercase
  const modifiedUrl = fullUrl.replace(/(%20|\s)/g, '-');

  return modifiedUrl;
};

export const validateMembership = (membershipArray: { address: string }[]) => {
  return !membershipArray.some(item => item.address === '')
}

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
    if (!Array.isArray(obj.info.socialMedia) || obj.info.socialMedia.length === 0) {
      // 'socialMedia' is not an array or it's an empty array
      return true;
    }
  }

  // All keys are filled, return true
  return false;
};

export const defaultDaoCreation = { style: '', info: { daoName: '', daoUrl: '', about: '', socialMedia: [{ type: '', link: '' }], logo: null, logoUrl: '' }, members: [{ address: '' }], duration: 0, quorum: 50 }

export const getStatus = (_proposal: IProposal) => {
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