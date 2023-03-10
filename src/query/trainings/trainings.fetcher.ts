import { privateApi } from '../../api/api';
import { ID } from '../../types/api';
import { ExercisesType } from '../exercises/exercises.type';

import { TrainingsBody, TrainingsType, UpdateTrainingsType } from './trainings.type';

class TrainingsFetcher {
    getExercises = (id: ID): Promise<ExercisesType[]> => {
        return privateApi.get<ExercisesType[]>(`/trainings/${id}/exercises`).then(response => response.data);
    };

    get = async (id?: ID): Promise<TrainingsType> => {
        if (!id) {
            return {} as TrainingsType;
        }
        return await privateApi.get<TrainingsType>(`/trainings/${id}`).then(response => response.data);
    };

    getAll = (): Promise<TrainingsType[]> => {
        return privateApi.get<TrainingsType[]>('/trainings').then(response => response.data);
    };

    create = async (body: TrainingsBody): Promise<void> => {
        await privateApi.post<void>('/trainings', body);
    };

    delete = async (id: ID): Promise<void> => {
        await privateApi.delete<void>(`/trainings/${id}`);
    };

    createExercise = async ([training_id, exercise_id]: [ID, ID]): Promise<void> => {
        await privateApi.post<void>(`/trainings/${training_id}/${exercise_id}`);
    };

    deleteExercise = async ([training_id, exercise_id]: [ID, ID]): Promise<void> => {
        await privateApi.delete<void>(`/trainings/${training_id}/${exercise_id}`);
    };

    update = async (body: TrainingsType): Promise<void> => {
        await privateApi.put<void>('/trainings', body);
    };

    updateAll = async (body: UpdateTrainingsType): Promise<void> => {
        await privateApi.put<void>('/trainings/all', body);
    };
}

export const trainingsFetcher = new TrainingsFetcher();
