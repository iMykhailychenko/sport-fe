import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { ID } from '../../types/api';

import { createIterationFetcher, deleteIterationFetcher, iterationsFetcher } from './iterations.fetcher';
import { Iteration, IterationBody } from './iterations.type';

export const useIterationsQuery = (date_id: ID, exercise_id: ID): UseQueryResult<Iteration[]> => {
    return useQuery({
        queryKey: ['iterations', date_id, exercise_id],
        queryFn: () => iterationsFetcher(date_id, exercise_id),
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useCreateIterationMutation = (): UseMutationResult<void, unknown, IterationBody> => {
    return useMutation({
        mutationFn: createIterationFetcher,
    });
};

export const useDeleteIterationMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({
        mutationFn: deleteIterationFetcher,
    });
};
