import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { ID } from '../../types/api';

import { iterationsFetcher } from './iterations.fetcher';
import { ExerciseIterations, Iteration, IterationBody, UpdateIterationBody } from './iterations.type';

export const useIterationsQuery = (date_id: ID, exercise_id: ID): UseQueryResult<Iteration[]> => {
    return useQuery<Iteration[]>({
        queryKey: ['iterations', date_id, exercise_id],
        queryFn: () => iterationsFetcher.get(date_id, exercise_id),
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useIterationsExerciseQuery = (exercise_id: ID): UseQueryResult<ExerciseIterations[]> => {
    return useQuery<ExerciseIterations[]>({
        queryKey: ['iterations', exercise_id],
        queryFn: () => iterationsFetcher.getExercise(exercise_id),
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useIterationsCreateMutation = (): UseMutationResult<void, unknown, IterationBody> => {
    return useMutation({
        mutationFn: iterationsFetcher.create,
    });
};

export const useIterationsDeleteMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({
        mutationFn: iterationsFetcher.delete,
    });
};

export const useIterationsUpdateMutation = (): UseMutationResult<void, unknown, UpdateIterationBody> => {
    return useMutation({
        mutationFn: iterationsFetcher.update,
    });
};
