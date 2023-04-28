import React from 'react';

import { IconButton, Text, Tr } from '@chakra-ui/react';
import { BiEdit } from 'react-icons/all';
import { Link, useLocation } from 'react-router-dom';

import { Table, Td } from '../../../components/table';
import { ExercisesType } from '../../../query/exercises/exercises.type';
import { useTrainingExercisesQuery } from '../../../query/trainings/trainings.hook';
import { ID } from '../../../types/api';

interface Props {
    id: ID;
}
export const ExercisesList = ({ id }: Props): JSX.Element => {
    const location = useLocation();
    const { data, isLoading } = useTrainingExercisesQuery(id);

    return (
        <Table<ExercisesType> data={data ?? []} isLoading={isLoading} loadingItems={1}>
            {item => (
                <Tr>
                    <Td w="100%">
                        <Text
                            as={Link}
                            state={{ from: location }}
                            to={`/exercises/${item.id}`}
                            noOfLines={1}
                            display="block"
                            maxWidth="80vw"
                        >
                            {item.title}
                        </Text>
                    </Td>
                    <Td>
                        <IconButton
                            as={Link}
                            state={{ from: location }}
                            aria-label="Редагувати вправу"
                            to={`/exercises/${item.id}/edit`}
                            size="sm"
                        >
                            <BiEdit />
                        </IconButton>
                    </Td>
                </Tr>
            )}
        </Table>
    );
};
