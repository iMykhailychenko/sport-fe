import { privateApi } from '../../api/api';

import { DateType, DateBody } from './dates.type';

export const dateFetcher = (date: string): Promise<DateType> => {
    return privateApi.get<DateType>(`/dates/${date}`).then(response => response.data);
};

export const createDateFetcher = async (body: DateBody): Promise<void> => {
    await privateApi.post<void>('/dates', body);
};
