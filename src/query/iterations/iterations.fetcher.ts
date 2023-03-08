import { privateApi } from '../../api/api';
import { ID } from '../../types/api';

import { Iteration, IterationBody } from './iterations.type';

export const iterationsFetcher = (date_id: ID, exercise_id: ID): Promise<Iteration[]> => {
    return privateApi.get<Iteration[]>(`/iterations/${date_id}/${exercise_id}`).then(response => response.data);
};

export const createIterationFetcher = async (body: IterationBody): Promise<void> => {
    await privateApi.post<void>('/iterations', body);
};

export const deleteIterationFetcher = async (iteration_id: ID): Promise<void> => {
    await privateApi.delete<void>(`/iterations/${iteration_id}`);
};
