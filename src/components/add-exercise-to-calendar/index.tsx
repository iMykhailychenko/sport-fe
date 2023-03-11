import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import { AddExercise } from './components/add-exercise';
import { AddTraining } from './components/add-training';

export const AddExerciseToCalendar = (): JSX.Element => {
    return (
        <Box my={6}>
            <Heading size="lg" mt={10} mb={5}>
                Додайте вправу на цей день
            </Heading>
            <AddTraining />
            <AddExercise />
        </Box>
    );
};
