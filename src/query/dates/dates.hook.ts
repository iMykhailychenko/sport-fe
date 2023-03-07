import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { useDate } from '../../context/date.context';

import { dateFetcher, createDateFetcher } from './dates.fetcher';
import { DateBody, DateType } from './dates.type';

export const useDateQuery = (): UseQueryResult<DateType> => {
    const { day, month, year } = useDate();
    const param = `${day}-${month}-${year}`;

    return useQuery<DateType>({
        queryKey: ['dates', param],
        queryFn: () => dateFetcher(param),
        retry: false,
        keepPreviousData: true,
        staleTime: 1_000,
        refetchOnWindowFocus: false,
    });
};

export const useDatesMutation = (): UseMutationResult<void, unknown, DateBody> => {
    return useMutation({ mutationFn: createDateFetcher });
};
