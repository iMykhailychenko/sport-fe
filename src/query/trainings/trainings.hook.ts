import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query/src/types';

import { ID } from '../../types/api';
import { ExercisesType } from '../exercises/exercises.type';

import { trainingsFetcher } from './trainings.fetcher';
import { TrainingsBody, TrainingsType, UpdateTrainingsType } from './trainings.type';

export const useTrainingsAllQuery = (): UseQueryResult<TrainingsType[]> => {
    return useQuery<TrainingsType[]>({
        queryKey: ['trainings'],
        queryFn: trainingsFetcher.getAll,
    });
};

export const useTrainingQuery = (id: ID): UseQueryResult<TrainingsType> => {
    return useQuery<TrainingsType>({
        queryKey: ['trainings', id],
        queryFn: () => trainingsFetcher.get(id),
        enabled: Boolean(id),
    });
};

export const useTrainingExercisesQuery = (id: ID): UseQueryResult<ExercisesType[]> => {
    return useQuery<ExercisesType[]>({
        queryKey: ['trainings', 'exercises', id],
        queryFn: () => trainingsFetcher.getExercises(id),
    });
};

export const useTrainingsCreateMutation = (): UseMutationResult<void, unknown, TrainingsBody> => {
    return useMutation({ mutationFn: trainingsFetcher.create });
};

export const useTrainingsDeleteMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({ mutationFn: trainingsFetcher.delete });
};

export const useTrainingsUpdateAllMutation = (): UseMutationResult<void, unknown, UpdateTrainingsType> => {
    return useMutation({ mutationFn: trainingsFetcher.updateAll });
};

export const useTrainingsUpdateMutation = (): UseMutationResult<void, unknown, TrainingsType> => {
    return useMutation({ mutationFn: trainingsFetcher.update });
};

export const useTrainingsExerciseDeleteMutation = (): UseMutationResult<void, unknown, [ID, ID]> => {
    return useMutation({ mutationFn: trainingsFetcher.deleteExercise });
};

export const useTrainingsExerciseCreateMutation = (): UseMutationResult<void, unknown, [ID, ID]> => {
    return useMutation({ mutationFn: trainingsFetcher.createExercise });
};
