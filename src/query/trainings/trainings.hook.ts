import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query/src/types';

import { ID } from '../../types/api';
import { ExercisesType } from '../exercises/exercises.type';

import { trainingsFetcher } from './trainings.fetcher';
import { TrainingsBody, TrainingsType, UpdateTrainingsType } from './trainings.type';

export const useAllTrainingsQuery = (): UseQueryResult<TrainingsType[]> => {
    return useQuery<TrainingsType[]>({
        queryKey: ['trainings'],
        queryFn: trainingsFetcher.getAll,
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useTrainingQuery = (id: ID): UseQueryResult<TrainingsType> => {
    return useQuery<TrainingsType>({
        queryKey: ['trainings', id],
        queryFn: () => trainingsFetcher.get(id),
        retry: false,
        refetchOnWindowFocus: false,
        enabled: Boolean(id),
    });
};

export const useTrainingExercisesQuery = (id: ID): UseQueryResult<ExercisesType[]> => {
    return useQuery<ExercisesType[]>({
        queryKey: ['trainings', 'exercises', id],
        queryFn: () => trainingsFetcher.getExercises(id),
        retry: false,
        refetchOnWindowFocus: false,
    });
};

export const useCreateTrainingsMutation = (): UseMutationResult<void, unknown, TrainingsBody> => {
    return useMutation({ mutationFn: trainingsFetcher.create });
};

export const useDeleteTrainingMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({ mutationFn: trainingsFetcher.delete });
};

export const useUpdateAllTrainingsMutation = (): UseMutationResult<void, unknown, UpdateTrainingsType> => {
    return useMutation({ mutationFn: trainingsFetcher.updateAll });
};

export const useUpdateTrainingsMutation = (): UseMutationResult<void, unknown, TrainingsType> => {
    return useMutation({ mutationFn: trainingsFetcher.update });
};

export const useDeleteTrainingExerciseMutation = (): UseMutationResult<void, unknown, [ID, ID]> => {
    return useMutation({ mutationFn: trainingsFetcher.deleteExercise });
};

export const useCreateTrainingsExerciseMutation = (): UseMutationResult<void, unknown, [ID, ID]> => {
    return useMutation({ mutationFn: trainingsFetcher.createExercise });
};
