import { buildUrlWithQuery } from '@/utils/url';
import { getAccessToken } from '@/actions/getAccessToken-action';
import { FlightSearchParams } from '@/types';

export const getFlights = async ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  children,
  infants,
  travelClass,
  maxPrice,
  max,
  nonStop,
  currencyCode,
}: FlightSearchParams) => {
  const token = await getAccessToken();
  const url = buildUrlWithQuery('/flight-offers', {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate,
    adults,
    children,
    infants,
    travelClass,
    maxPrice,
    max,
    nonStop,
    currencyCode,
  });
  const response = await fetch(`${process.env.BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw await response.json();
  }
  const data = await response.json();
  return data;
};
