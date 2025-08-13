import { getCities } from '@/actions/get-city-action';
import { CitiesParams } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useGetCitiesQuery = (params: CitiesParams, enabled: boolean) => {
  return useQuery({
    queryKey: ['flights', params],
    queryFn: async () => {
      const response = await getCities({
        keyword: params.keyword ? params.keyword : 'Paris',
        max: params.max ?? 200,
        include: params.include ?? 'AIRPORTS',
      });
      return response;
    },
    enabled,
  });
};
