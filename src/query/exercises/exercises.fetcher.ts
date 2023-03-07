import { privateApi } from '../../api/api';
import { ID } from '../../types/api';

import { ExercisesBody, ExercisesType } from './exercises.type';

export const exercisesFetcher = (): Promise<ExercisesType[]> => {
    return privateApi.get<ExercisesType[]>('/exercises').then(response => response.data);
};

export const createExercisesFetcher = async (body: ExercisesBody): Promise<void> => {
    await privateApi.post<void>('/exercises', body);
};

export const trainingExercisesFetcher = (id: ID): Promise<ExercisesType[]> => {
    return privateApi.get<ExercisesType[]>(`/trainings/${id}`).then(response => response.data);
};
