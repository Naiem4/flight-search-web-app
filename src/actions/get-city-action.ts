
import { buildUrlWithQuery } from '@/utils/url';
import { getAccessToken } from '@/actions/getAccessToken-action';
import { CitiesParams } from '@/types';

export const getCities = async ({
  keyword,
  max = 10,
  include = 'AIRPORTS',
}: CitiesParams) => {
  const token = await getAccessToken();
  const url = buildUrlWithQuery('/cities', {
    keyword,
    max,
    include,
  });
  const response = await fetch(`${process.env.NEXT_PUBLIC_CITIES_URL}${url}`, {
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
