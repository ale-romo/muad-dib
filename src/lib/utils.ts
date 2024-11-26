import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface QueryParams {
  [key: string]: string | undefined;
}

export const updateQueryParams = (params: QueryParams) => {
  const [baseTitle] = window.location.hash.split('?');
  const queryParams = new URLSearchParams(window.location.hash.split('?')[1]);

  // Set or delete params based on values
  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, value);
    } else {
      queryParams.delete(key); // Remove if value is empty or undefined
    }
  });

  // Construct the new hash
  const newHash = queryParams.toString()
    ? `${baseTitle}?${queryParams.toString()}` // Include '?' only if there are params
    : baseTitle; // No query params, just use the title

  // Update the window hash
  window.location.hash = newHash;
};


export const checkParam = (param: string, options: string[]) => {
  return options.includes(param) ? param : options[0];
}

