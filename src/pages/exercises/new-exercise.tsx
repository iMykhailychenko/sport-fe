import React from 'react';

import { Heading } from '@chakra-ui/react';

import { useCreateExercisesMutation } from '../../query/exercises/exercises.hook';

import { ExerciseForm } from './components/exercise-form';

const NewExercise = (): JSX.Element => {
    const { mutateAsync } = useCreateExercisesMutation();

    return (
        <>
            <Heading mb={6} size="md">
                Додати нову вправу
            </Heading>

            <ExerciseForm onSubmit={mutateAsync} buttonLabel="Додати вправу" />
        </>
    );
};

export default NewExercise;
