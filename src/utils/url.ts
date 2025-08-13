/* eslint-disable @typescript-eslint/no-explicit-any */
export const buildUrlWithQuery = <T extends Record<string, any>>(
  baseUrl: string,
  query: T
): string => {
  const queryString = Object.entries(query)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};