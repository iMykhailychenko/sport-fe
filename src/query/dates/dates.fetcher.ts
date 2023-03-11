import { privateApi } from '../../api/api';
import { ID } from '../../types/api';

import { DateType, DateExerciseBody, DateTrainingBody } from './dates.type';

class DateFetcher {
    get = (date: string): Promise<DateType[]> => {
        return privateApi.get<DateType[]>(`/dates/${date}`).then(response => response.data);
    };

    create = async (body: DateExerciseBody): Promise<void> => {
        await privateApi.post<void>('/dates', body);
    };

    createAll = async (body: DateTrainingBody): Promise<void> => {
        await privateApi.post<void>('/dates/training', body);
    };

    delete = async ([date_id, exercise_id]: [ID, ID]): Promise<void> => {
        await privateApi.delete<void>(`/dates/${date_id}/${exercise_id}`);
    };
}

export const dateFetcher = new DateFetcher();
