import { privateApi } from '../../api/api';
import { ID } from '../../types/api';

import { ExercisesBody, ExercisesType } from './exercises.type';

class TrainingFetcher {
    get = async (id?: ID): Promise<ExercisesType> => {
        if (!id) {
            return {} as ExercisesType;
        }
        return await privateApi.get<ExercisesType>(`/exercises/${id}`).then(response => response.data);
    };

    getAll = (): Promise<ExercisesType[]> => {
        return privateApi.get<ExercisesType[]>('/exercises').then(response => response.data);
    };

    update = async (body: ExercisesType): Promise<void> => {
        await privateApi.put<void>('/exercises', body);
    };

    create = async (body: ExercisesBody): Promise<void> => {
        await privateApi.post<void>('/exercises', body);
    };

    delete = async (id: ID): Promise<void> => {
        await privateApi.delete<void>(`/exercises/${id}`);
    };
}

export const trainingFetcher = new TrainingFetcher();
