import React from 'react';

import { Heading, Flex, IconButton } from '@chakra-ui/react';
import { HiOutlinePlusSm, BiEdit } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { Table, Td } from '../../components/table';
import { useAllExercisesQuery } from '../../query/exercises/exercises.hook';
import { ExercisesType } from '../../query/exercises/exercises.type';

const header = ['Назва', ''];

const Exercises = (): JSX.Element => {
    const { data, isLoading } = useAllExercisesQuery();

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading size="md">Список вправ</Heading>

                <IconButton as={Link} aria-label="Додати нову вправу" to="/exercises/new">
                    <HiOutlinePlusSm />
                </IconButton>
            </Flex>

            <Table<ExercisesType> header={header} isLoading={isLoading} data={data ?? []}>
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
        </>
    );
};

export default Exercises;
