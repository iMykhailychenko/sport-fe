import React from 'react';

import { Heading } from '@chakra-ui/react';

import { useExercisesCreateMutation } from '../../query/exercises/exercises.hook';

import { ExerciseForm } from './components/exercise-form';

const NewExercise = (): JSX.Element => {
    const { mutateAsync } = useExercisesCreateMutation();

    return (
        <>
            <Heading mb={2} size="md">
                Додати нову вправу
            </Heading>

            <ExerciseForm onSubmit={mutateAsync} buttonLabel="Додати вправу" />
        </>
    );
};

export default NewExercise;
