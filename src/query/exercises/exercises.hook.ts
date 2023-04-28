import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query/src/types';

import { ID } from '../../types/api';

import { trainingFetcher } from './exercises.fetcher';
import { ExercisesBody, ExercisesType } from './exercises.type';

export const useExercisesAllQuery = (): UseQueryResult<ExercisesType[]> => {
    return useQuery<ExercisesType[]>({
        queryKey: ['exercises'],
        queryFn: trainingFetcher.getAll,
    });
};

export const useExerciseQuery = (id?: ID): UseQueryResult<ExercisesType> => {
    return useQuery<ExercisesType>({
        queryKey: ['exercises', id],
        queryFn: () => trainingFetcher.get(id),
        enabled: Boolean(id),
    });
};

export const useExercisesCreateMutation = (): UseMutationResult<void, unknown, ExercisesBody> => {
    return useMutation({ mutationKey: ['exercises', 'new'], mutationFn: trainingFetcher.create });
};

export const useExercisesUpdateMutation = (): UseMutationResult<void, unknown, ExercisesType> => {
    return useMutation({ mutationKey: ['exercises', 'new'], mutationFn: trainingFetcher.update });
};

export const useExercisesDeleteMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({ mutationKey: ['exercises', 'new'], mutationFn: trainingFetcher.delete });
};
