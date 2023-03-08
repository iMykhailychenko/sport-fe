import { memo } from 'react';

import { Grid, Input, IconButton, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CgMathPlus } from 'react-icons/all';

import { errorToast } from '../../../config/toast.config';
import { useCreateIterationMutation, useIterationsQuery } from '../../../query/iterations/iterations.hook';
import { IterationBody } from '../../../query/iterations/iterations.type';
import { ID } from '../../../types/api';

import { IterationsTable } from './iterations-table';

type FormData = Pick<IterationBody, 'repeat' | 'weight' | 'time'>;

interface Props {
    date_id: ID;
    exercise_id: ID;
}

export const Iterations = memo(({ date_id, exercise_id }: Props): JSX.Element => {
    const toast = useToast();
    const { data, isLoading, refetch } = useIterationsQuery(date_id, exercise_id);

    const { reset, register, handleSubmit } = useForm<FormData>();
    const { mutate } = useCreateIterationMutation();
    const onSubmit = (data: FormData): void => {
        mutate(
            {
                time: data.time || 0,
                repeat: data.repeat || 0,
                weight: data.weight || 0,
                date_id,
                exercise_id,
            },
            {
                onSuccess: () => {
                    reset();
                    refetch();
                },
                onError: () => {
                    toast(errorToast);
                },
            },
        );
    };

    return (
        <>
            <IterationsTable data={data} isLoading={isLoading} />

            <Grid as="form" templateColumns="repeat(4, 1fr)" gap={2} mb={5} onSubmit={handleSubmit(onSubmit)} pr={1}>
                <Input placeholder="8 разів" type="number" {...register('repeat', { valueAsNumber: true })} />
                <Input placeholder="70 кг" type="number" {...register('weight', { valueAsNumber: true })} />
                <Input placeholder="30 хв" type="number" {...register('time', { valueAsNumber: true })} />
                <IconButton aria-label="Додати підхід" type="submit">
                    <CgMathPlus />
                </IconButton>
            </Grid>
        </>
    );
});

Iterations.displayName = 'Iterations';
