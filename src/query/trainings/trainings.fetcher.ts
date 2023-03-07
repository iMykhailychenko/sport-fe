import { privateApi } from '../../api/api';
import { ID } from '../../types/api';
import { ExercisesType } from '../exercises/exercises.type';

import { TrainingsBody, TrainingsType } from './trainings.type';

export const trainingsFetcher = (): Promise<TrainingsType[]> => {
    return privateApi.get<TrainingsType[]>('/trainings').then(response => response.data);
};

export const createTrainingsFetcher = async (body: TrainingsBody): Promise<void> => {
    await privateApi.post<void>('/trainings', body);
};

export const deleteTrainingsFetcher = async (id: ID): Promise<void> => {
    await privateApi.delete(`/trainings/${id}`);
};
