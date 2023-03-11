import React from 'react';

import { Heading, Flex, IconButton, Text, InputLeftElement, Input, InputGroup, Tr } from '@chakra-ui/react';
import { HiOutlinePlusSm, BiEdit, RiSearchLine } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { Table, Td } from '../../components/table';
import { useFuseInput } from '../../hooks/fuse.hook';
import { useExercisesAllQuery } from '../../query/exercises/exercises.hook';
import { ExercisesType } from '../../query/exercises/exercises.type';

const Exercises = (): JSX.Element => {
    const { data, isLoading } = useExercisesAllQuery();
    const { search, list, onChange } = useFuseInput(data, ['title']);

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading size="md">Список вправ</Heading>

                <IconButton as={Link} aria-label="Додати нову вправу" to="/exercises/new" size="sm">
                    <HiOutlinePlusSm />
                </IconButton>
            </Flex>

            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <RiSearchLine />
                </InputLeftElement>
                <Input type="search" value={search} onChange={onChange} placeholder="Шукати" />
            </InputGroup>

            <Table<ExercisesType> isLoading={isLoading} data={list}>
                {item => (
                    <Tr>
                        <Td w="100%">
                            <Text as={Link} to={`/exercises/${item.id}`} noOfLines={1} display="block" maxWidth="73vw">
                                {item.title}
                            </Text>
                        </Td>
                        <Td>
                            <IconButton as={Link} aria-label="Редагувати вправу" to={`/exercises/${item.id}/edit`} size="sm">
                                <BiEdit />
                            </IconButton>
                        </Td>
                    </Tr>
                )}
            </Table>
        </>
    );
};

export default Exercises;
