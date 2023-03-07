import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query/src/types';

import { ID } from '../../types/api';

import { createExercisesFetcher, exercisesFetcher, trainingExercisesFetcher } from './exercises.fetcher';
import { ExercisesBody, ExercisesType } from './exercises.type';

export const useExercisesQuery = (): UseQueryResult<ExercisesType[]> => {
    return useQuery({
        queryKey: ['exercises'],
        queryFn: exercisesFetcher,
        refetchOnWindowFocus: false,
        staleTime: 30_000,
    });
};

export const useExercisesMutation = (): UseMutationResult<void, unknown, ExercisesBody> => {
    return useMutation({ mutationKey: ['exercises', 'new'], mutationFn: createExercisesFetcher });
};

export const useTrainingExercisesQuery = (id: ID): UseQueryResult<ExercisesType[]> => {
    return useQuery({
        queryKey: ['trainings', String(id)],
        queryFn: () => trainingExercisesFetcher(id),
        retry: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });
};
