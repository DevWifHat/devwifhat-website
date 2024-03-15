import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateMiddle(text: string, startChars = 3, endChars = 3, separator = '...') {
  if (text.length <= startChars + endChars) {
    return text;
  }
  return `${text.substring(0, startChars)}${separator}${text.substring(text.length - endChars)}`;
}