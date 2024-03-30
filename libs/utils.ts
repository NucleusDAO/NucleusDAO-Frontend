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
  const modifiedUrl = fullUrl.replace(/(%20|\s)/g, '+');

  return modifiedUrl;
};