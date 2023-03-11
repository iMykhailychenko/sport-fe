import React from 'react';

import { Input, IconButton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { HiOutlinePlusSm } from 'react-icons/all';

import { useIterationsCreateMutation } from '../../query/iterations/iterations.hook';
import { ID } from '../../types/api';
import { Td } from '../table';

import { IterationForm } from './type';

interface Props {
    date_id: ID;
    exercise_id: ID;
}

export const IterationsForm = ({ date_id, exercise_id }: Props): JSX.Element => {
    const queryClient = useQueryClient();
    const { mutate } = useIterationsCreateMutation();
    const { register, handleSubmit } = useForm<IterationForm>();

    const onSubmit = ({ time, repeat, weight }: IterationForm): void => {
        if (!time && !repeat && !weight) return;

        mutate(
            { time: time || 0, repeat: repeat || 0, weight: weight || 0, date_id, exercise_id },
            { onSuccess: () => queryClient.refetchQueries(['iterations', date_id, exercise_id]) },
        );
    };

    return (
        <>
            <Td w="35%">
                <Input size="sm" placeholder="8 разів" type="number" {...register('repeat', { valueAsNumber: true })} />
            </Td>
            <Td w="35%">
                <Input size="sm" placeholder="70 кг" type="number" {...register('weight', { valueAsNumber: true })} />
            </Td>
            <Td w="35%">
                <Input size="sm" placeholder="30 хв" type="number" {...register('time', { valueAsNumber: true })} />
            </Td>
            <Td>
                <IconButton size="sm" aria-label="Опції" onClick={handleSubmit(onSubmit)}>
                    <HiOutlinePlusSm />
                </IconButton>
            </Td>
        </>
    );
};
