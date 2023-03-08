import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { useDate } from '../../context/date.context';
import { ID } from '../../types/api';

import { dateFetcher, createDateFetcher, deleteDateFetcher } from './dates.fetcher';
import { DateBody, DateType } from './dates.type';

export const useDateQuery = (): UseQueryResult<DateType> => {
    const { day, month, year } = useDate();
    const param = `${day}-${month}-${year}`;

    return useQuery<DateType>({
        queryKey: ['dates', param],
        queryFn: () => dateFetcher(param),
        retry: false,
    });
};

export const useDatesMutation = (): UseMutationResult<void, unknown, DateBody> => {
    return useMutation({ mutationFn: createDateFetcher });
};

export const useDeleteDatesMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({ mutationFn: deleteDateFetcher });
};
