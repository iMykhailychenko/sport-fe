import React from 'react';

import { IconButton } from '@chakra-ui/react';
import { BiEdit } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { Table, Td } from '../../../components/table';
import { ExercisesType } from '../../../query/exercises/exercises.type';
import { useTrainingExercisesQuery } from '../../../query/trainings/trainings.hook';
import { ID } from '../../../types/api';

const header = ['Назва', ''];

interface Props {
    id: ID;
}
export const ExercisesList = ({ id }: Props): JSX.Element => {
    const { data, isLoading } = useTrainingExercisesQuery(id);

    return (
        <Table<ExercisesType> data={data ?? []} isLoading={isLoading} header={header} loadingItems={1}>
            {item => (
                <>
                    <Td w="100%">{item.title}</Td>
                    <Td>
                        <IconButton as={Link} aria-label="Редагувати вправу" to={`/exercises/${item.id}`}>
                            <BiEdit />
                        </IconButton>
                    </Td>
                </>
            )}
        </Table>
    );
};
