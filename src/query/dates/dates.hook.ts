import { useQuery, useMutation, UseQueryResult, UseMutationResult } from '@tanstack/react-query';

import { useDate } from '../../context/date.context';
import { ID } from '../../types/api';

import { dateFetcher } from './dates.fetcher';
import { DateType, DateExerciseBody, DateTrainingBody } from './dates.type';

export const useDateQuery = (): UseQueryResult<DateType[]> => {
    const { dateFormat } = useDate();

    return useQuery<DateType[]>({
        queryKey: ['dates', dateFormat],
        queryFn: () => dateFetcher.get(dateFormat),
    });
};

export const useDatesCreateMutation = (): UseMutationResult<void, unknown, DateExerciseBody> => {
    return useMutation({ mutationFn: dateFetcher.create });
};

export const useDatesCreateAllMutation = (): UseMutationResult<void, unknown, DateTrainingBody> => {
    return useMutation({ mutationFn: dateFetcher.createAll });
};

export const useDatesDeleteMutation = (): UseMutationResult<void, unknown, [ID, ID]> => {
    return useMutation({ mutationFn: dateFetcher.delete });
};

export const useDatesCalendarQuery = (): UseQueryResult<string[]> => {
    const { month, year } = useDate();
    const monthAndYear = `${month}-${year}`;

    return useQuery<string[]>({
        queryKey: ['dates', 'calendar', monthAndYear],
        queryFn: () => dateFetcher.getCalendar(monthAndYear),
        placeholderData: [],
    });
};
