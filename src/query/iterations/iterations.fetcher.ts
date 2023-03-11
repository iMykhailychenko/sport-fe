import { privateApi } from '../../api/api';
import { ID } from '../../types/api';

import { ExerciseIterations, Iteration, IterationBody, UpdateIterationBody } from './iterations.type';

class IterationsFetcher {
    get = (date_id: ID, exercise_id: ID): Promise<Iteration[]> => {
        return privateApi.get<Iteration[]>(`/iterations/${date_id}/${exercise_id}`).then(response => response.data);
    };

    getExercise = (exercise_id: ID): Promise<ExerciseIterations[]> => {
        return privateApi.get<ExerciseIterations[]>(`/iterations/${exercise_id}`).then(response => response.data);
    };

    create = async (body: IterationBody): Promise<void> => {
        await privateApi.post<void>('/iterations', body);
    };

    delete = async (iteration_id: ID): Promise<void> => {
        await privateApi.delete<void>(`/iterations/${iteration_id}`);
    };

    update = async (body: UpdateIterationBody): Promise<void> => {
        await privateApi.put<void>(`/iterations`, body);
    };
}

export const iterationsFetcher = new IterationsFetcher();
