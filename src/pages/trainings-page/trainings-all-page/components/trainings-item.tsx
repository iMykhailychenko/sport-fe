import { HStack, Button } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { BiEdit, RiDeleteBin6Line } from 'react-icons/all';

import { ExercisesList } from '../../../../components/exercise-list';
import { useTrainingExercisesQuery } from '../../../../query/exercises/exercises.hook';
import { ExercisesType } from '../../../../query/exercises/exercises.type';
import { useDeleteTrainingMutation } from '../../../../query/trainings/trainings.hook';
import { ID } from '../../../../types/api';

interface Props {
    id: ID;
}

export const TrainingsItem = ({ id }: Props): JSX.Element => {
    const queryClient = useQueryClient();

    const { data, isLoading } = useTrainingExercisesQuery(id);
    const { mutate } = useDeleteTrainingMutation();

    const handleDelete = (): void => {
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries(['trainings']);
            },
        });
    };

    return (
        <>
            <HStack mb={4} px={4}>
                <Button leftIcon={<BiEdit />}>Редагувати</Button>
                <Button onClick={handleDelete} leftIcon={<RiDeleteBin6Line />}>
                    Видалити
                </Button>
            </HStack>

            <ExercisesList isLoading={isLoading} list={(data as ExercisesType[]) ?? []} />
        </>
    );
};
