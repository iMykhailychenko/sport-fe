import React from 'react';

import { Heading } from '@chakra-ui/react';

import { AddExercise } from './components/add-exercise';
import { AddTraining } from './components/add-training';

export const AddExerciseToCalendar = (): JSX.Element => {
    return (
        <>
            <Heading size="md" my={4}>
                Додайте вправу на цей день
            </Heading>
            <AddTraining />
            <AddExercise />
        </>
    );
};
