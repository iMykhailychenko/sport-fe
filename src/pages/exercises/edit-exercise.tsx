import React, { useEffect } from 'react';

import { Button, Heading } from '@chakra-ui/react';
import { RiDeleteBinLine } from 'react-icons/all';
import { useNavigate, useParams } from 'react-router-dom';

import { ListLoader } from '../../components/list-loader';
import { useExercisesDeleteMutation, useExerciseQuery, useExercisesUpdateMutation } from '../../query/exercises/exercises.hook';
import { ExercisesBody, ExercisesType } from '../../query/exercises/exercises.type';

import { ExerciseForm } from './components/exercise-form';

const EditExercise = (): JSX.Element => {
    const navigate = useNavigate();
    const params = useParams();
    const exerciseId = Number(params.exerciseId);
    const { data, isLoading, isError } = useExerciseQuery(exerciseId);

    useEffect(() => {
        if (isError) {
            navigate('/exercises');
        }
    }, [isError]);

    const { mutateAsync: updateExercisesMutation } = useExercisesUpdateMutation();
    const { mutate: deleteExercisesMutation } = useExercisesDeleteMutation();

    const onSubmit = async (data: ExercisesBody): Promise<void> => {
        try {
            await updateExercisesMutation({ ...data, id: exerciseId } as ExercisesType);
            await navigate('/exercises');
        } catch (err) {
            console.log(err);
        }
    };

    const onDelete = (): void => {
        deleteExercisesMutation(exerciseId, {
            onSuccess: () => {
                navigate('/exercises');
            },
        });
    };

    return (
        <>
            <Heading mb={4} size="md">
                Редагувати вправу
            </Heading>

            <Button mb={4} rightIcon={<RiDeleteBinLine />} onClick={onDelete}>
                Видалити вправу
            </Button>

            {isLoading ? (
                <ListLoader />
            ) : (
                !isError && <ExerciseForm defaultValues={data} onSubmit={onSubmit} buttonLabel="Зберегти" />
            )}
        </>
    );
};

export default EditExercise;
