import React, { useRef, useEffect, useState, useMemo } from 'react';

import {
    Button,
    Collapse,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Textarea,
    Heading,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Fuse from 'fuse.js';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { Table, Td } from '../../../components/table';
import { useAllExercisesQuery } from '../../../query/exercises/exercises.hook';
import { ExercisesBody, ExercisesType } from '../../../query/exercises/exercises.type';

const ExerciseSchema = object({
    title: string().min(3, 'Дуже коротка назва').required('Обовʼязкове поле'),
    description: string().max(300, 'Дуже довгий опис').optional().nullable(),
    image: string().url('Невалідна адреса').max(300, 'Дуже довгий опис').optional().nullable(),
});

interface Props {
    buttonLabel: string;
    defaultValues?: Partial<ExercisesBody>;
    onSubmit: (data: ExercisesBody) => Promise<void>;
}

export const ExerciseForm = ({ onSubmit, defaultValues, buttonLabel }: Props): JSX.Element => {
    const { isOpen, onToggle } = useDisclosure();
    const {
        watch,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ExercisesBody>({ defaultValues, resolver: yupResolver(ExerciseSchema) });

    const { data, refetch, isLoading } = useAllExercisesQuery();
    const fuse = useRef<Fuse<ExercisesType> | null>(null);
    const [searchResult, setSearchResult] = useState<Fuse.FuseResult<ExercisesType>[]>([]);

    useEffect(() => {
        if (data) {
            fuse.current = new Fuse(data, { keys: ['title'] });
        }
    }, [data]);

    const title = watch('title') || '';
    useEffect(() => {
        if (fuse.current) {
            setSearchResult(fuse.current.search(title));
        }
    }, [title]);

    const list = useMemo(
        () => (searchResult?.length ? searchResult.map(element => element.item) : data || []),
        [searchResult, data],
    );

    const innerSubmit = (data: ExercisesBody): void => {
        onSubmit(data).then(() => {
            reset();
            refetch();
        });
    };

    return (
        <>
            <form action="#" onSubmit={handleSubmit(innerSubmit)}>
                <FormControl isRequired isInvalid={Boolean(errors.title)}>
                    <FormLabel>Назва</FormLabel>
                    <Input autoFocus type="text" placeholder="Назва вправи" {...register('title', { required: true })} />
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>

                <Collapse in={isOpen} animateOpacity>
                    <Stack spacing={6} mt={6}>
                        <FormControl isInvalid={Boolean(errors.description)}>
                            <FormLabel>Опис</FormLabel>
                            <Textarea placeholder="Назва вправи" {...register('description')} />
                            <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={Boolean(errors.image)}>
                            <FormLabel>Зображення</FormLabel>
                            <Input type="url" placeholder="https://example.com/image.jpeg" {...register('image')} />
                            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
                        </FormControl>
                    </Stack>
                </Collapse>

                <Flex alignItems="center" justifyContent="space-between" my={6}>
                    <Button w="48%" onClick={onToggle}>
                        {isOpen ? 'Приховати деталі' : 'Додати деталі'}
                    </Button>

                    <Button w="48%" type="submit" colorScheme="blue">
                        {buttonLabel}
                    </Button>
                </Flex>
            </form>

            <Heading mb={4} mt={10} size="md">
                {searchResult?.length ? 'Схожі вправи' : 'Всі вправи'}
            </Heading>
            <Table<ExercisesType> header={['Назва']} data={list} isLoading={isLoading}>
                {item => <Td key={item.id}>{item.title}</Td>}
            </Table>
        </>
    );
};
