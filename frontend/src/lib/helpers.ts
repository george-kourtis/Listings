/**
 * Capitalize the first letter of a string.
 *
 * @example capitalizeFirstLetter('hello world') // 'Hello world'
 * @param {string} string - The string to capitalize.
 * @returns {string} The capitalized string.
 */
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
