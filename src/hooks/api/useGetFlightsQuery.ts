import { getFlights } from '@/actions/getFlights-action';
import { FlightSearchParams } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useGetAllFlightsQuery = (
  params: FlightSearchParams,
  enabled: boolean
) => {
  return useInfiniteQuery({
    queryKey: ['flights', params],
    queryFn: async ({ pageParam }) => {
      const response = await getFlights({
        ...params,
        page: pageParam,
        limit: params.limit ?? 10,
      });
      return response;
    },
    enabled,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });
};
