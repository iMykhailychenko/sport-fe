import React from 'react';

import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/all';

import { useFuseInput } from '../../../../hooks/fuse.hook';
import { useExercisesAllQuery } from '../../../../query/exercises/exercises.hook';
import { ExercisesType } from '../../../../query/exercises/exercises.type';
import { Table } from '../../../table';

import { AddExerciseTable } from './add-exercise-table';

export const AddExercise = (): JSX.Element => {
    const { data, isLoading } = useExercisesAllQuery();
    const { search, list, onChange } = useFuseInput(data, ['title']);

    return (
        <>
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <RiSearchLine />
                </InputLeftElement>
                <Input type="search" value={search} onChange={onChange} placeholder="Шукати" />
            </InputGroup>

            <Table<ExercisesType> isLoading={isLoading} data={list}>
                {item => <AddExerciseTable item={item} />}
            </Table>
        </>
    );
};
