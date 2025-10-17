import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that merges multiple class names into a single class string.
 * It is a wrapper around the `clsx` and `twMerge` functions from the `clsx` and `tailwind-merge` libraries, respectively.
 * @param {...inputs} - A variable number of class names to merge
 * @returns A single class string that is the result of merging the input class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
