import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { ID } from '../../types/api';

import { iterationsFetcher } from './iterations.fetcher';
import { Iteration, IterationBody, UpdateIterationBody } from './iterations.type';

export const useIterationsQuery = (date_id: ID, exercise_id: ID): UseQueryResult<Iteration[]> => {
    return useQuery<Iteration[]>({
        queryKey: ['iterations', date_id, exercise_id],
        queryFn: () => iterationsFetcher.get(date_id, exercise_id),
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useCreateIterationMutation = (): UseMutationResult<void, unknown, IterationBody> => {
    return useMutation({
        mutationFn: iterationsFetcher.create,
    });
};

export const useDeleteIterationMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({
        mutationFn: iterationsFetcher.delete,
    });
};

export const useUpdateIterationMutation = (): UseMutationResult<void, unknown, UpdateIterationBody> => {
    return useMutation({
        mutationFn: iterationsFetcher.update,
    });
};
