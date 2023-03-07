import { useMutation, useQuery, UseQueryResult } from '@tanstack/react-query';
import { UseMutationResult } from '@tanstack/react-query/src/types';

import { ID } from '../../types/api';

import { trainingsFetcher, createTrainingsFetcher, deleteTrainingsFetcher } from './trainings.fetcher';
import { TrainingsBody, TrainingsType } from './trainings.type';

export const useTrainingsQuery = (): UseQueryResult<TrainingsType[]> => {
    return useQuery({ queryKey: ['trainings'], queryFn: trainingsFetcher, retry: false, refetchOnWindowFocus: false });
};

export const useTrainingsMutation = (): UseMutationResult<void, unknown, TrainingsBody> => {
    return useMutation({ mutationFn: createTrainingsFetcher });
};

export const useDeleteTrainingMutation = (): UseMutationResult<void, unknown, ID> => {
    return useMutation({ mutationFn: deleteTrainingsFetcher });
};
