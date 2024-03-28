import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleChangeNumberInput = (value: string, state: (arg: string) => void) => {
  if (value.startsWith('0')) {
      state('')
  } else {
      state(value)
  }
}