import React from 'react';

import {
    Button,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { omit } from 'lodash-es';
import { useForm } from 'react-hook-form';

import { useUpdateIterationMutation } from '../../query/iterations/iterations.hook';
import { Iteration } from '../../query/iterations/iterations.type';

import { IterationForm } from './type';

interface Props {
    onClose: () => void;
    iteration: Iteration;
    refetch: () => Promise<unknown>;
}
export const EditIterationForm = ({ onClose, iteration, refetch }: Props): JSX.Element => {
    const id = `edit-iteration-${iteration.id}`;

    const { mutate } = useUpdateIterationMutation();
    const { register, handleSubmit } = useForm<IterationForm>({ defaultValues: omit(iteration, ['date_id', 'exercise_id']) });

    const onSubmit = (data: IterationForm): void => {
        mutate(
            { ...data, id: iteration.id },
            {
                onSuccess: () => {
                    refetch().then(onClose);
                },
            },
        );
    };

    return (
        <>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Редагувати підхід</DrawerHeader>
                <DrawerBody as="form" action="#" id={id} onSubmit={handleSubmit(onSubmit)}>
                    <FormControl mt={5}>
                        <FormLabel>Повтори</FormLabel>
                        <Input placeholder="8 разів" type="number" {...register('repeat', { valueAsNumber: true })} />
                    </FormControl>

                    <FormControl mt={5}>
                        <FormLabel>Вага</FormLabel>
                        <Input placeholder="70 кг" type="number" {...register('weight', { valueAsNumber: true })} />
                    </FormControl>

                    <FormControl my={5}>
                        <FormLabel>Час</FormLabel>
                        <Input placeholder="30 хв" type="number" {...register('time', { valueAsNumber: true })} />
                    </FormControl>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Відхилити
                    </Button>
                    <Button colorScheme="blue" type="submit" form={id}>
                        Зберегти
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </>
    );
};
