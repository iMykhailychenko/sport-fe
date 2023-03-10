import React, { useCallback } from 'react';

import { Box } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import { useDate } from '../../context/date.context';
import { useDatesCreateAllMutation, useDatesCreateMutation } from '../../query/dates/dates.hook';
import { useAllExercisesQuery } from '../../query/exercises/exercises.hook';
import { useAllTrainingsQuery } from '../../query/trainings/trainings.hook';
import { ID } from '../../types/api';

import { SelectItem } from './components/select-item';

export const AddExerciseToCalendar = (): JSX.Element => {
    const { dateFormat } = useDate();
    const queryClient = useQueryClient();

    const { mutate: exercisesMutate } = useDatesCreateMutation();
    const { mutate: trainingsMutate } = useDatesCreateAllMutation();

    const { data: exercises, isLoading: isExercisesLoading } = useAllExercisesQuery();
    const { data: trainings, isLoading: isTrainingsLoading } = useAllTrainingsQuery();

    const onExercisesSubmit = useCallback(
        (value: ID): void => {
            exercisesMutate(
                { date: dateFormat, exercise_id: value },
                {
                    onSuccess: () => queryClient.refetchQueries(['dates', dateFormat]),
                },
            );
        },
        [dateFormat],
    );

    const onTrainingsSubmit = useCallback(
        (value: ID): void => {
            trainingsMutate(
                { date: dateFormat, training_id: value },
                {
                    onSuccess: () => queryClient.refetchQueries(['dates', dateFormat]),
                },
            );
        },
        [dateFormat],
    );

    return (
        <Box my={6}>
            <SelectItem
                data={exercises}
                isLoading={isExercisesLoading}
                title="Додати вправу"
                placeholder="Виберіть вправу"
                onSubmit={onExercisesSubmit}
            />
            <SelectItem
                data={trainings}
                isLoading={isTrainingsLoading}
                title="Додати тренування"
                placeholder="Виберіть тренування"
                onSubmit={onTrainingsSubmit}
            />
        </Box>
    );
};
