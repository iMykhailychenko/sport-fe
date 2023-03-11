import React from 'react';

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
    Text,
    useDisclosure,
    Tr,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';

import { Table, Td } from '../../../components/table';
import { useFuse } from '../../../hooks/fuse.hook';
import { useExercisesAllQuery } from '../../../query/exercises/exercises.hook';
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

    const { data, refetch, isLoading } = useExercisesAllQuery();

    const title = watch('title') || '';
    const list = useFuse(data, title, ['title']);

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
                Схожі вправи
            </Heading>
            <Table<ExercisesType> header={['Назва']} data={list} isLoading={isLoading}>
                {item => (
                    <Tr>
                        <Td key={item.id}>
                            <Text as={Link} to={`/exercises/${item.id}`} noOfLines={1} display="block" maxWidth="90vw">
                                {item.title}
                            </Text>
                        </Td>
                    </Tr>
                )}
            </Table>
        </>
    );
};
