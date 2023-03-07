import {
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Stack,
    Button,
    Collapse,
    useDisclosure,
    Flex,
    FormErrorMessage,
    Heading,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';

import { ExercisesList } from '../../../components/exercise-list';
import { useExercisesMutation, useExercisesQuery } from '../../../query/exercises/exercises.hook';
import { ExercisesBody } from '../../../query/exercises/exercises.type';

const ExerciseSchema = object({
    title: string().min(3, 'Дуже коротка назва').required('Обовʼязкове поле'),
    description: string().max(300, 'Дуже довгий опис').optional().nullable(),
    image: string().url('Невалідна адреса').max(300, 'Дуже довгий опис').optional().nullable(),
});

const NewExercisesPage = (): JSX.Element => {
    const { isOpen, onToggle } = useDisclosure();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ExercisesBody>({ resolver: yupResolver(ExerciseSchema) });

    const { data, refetch, isLoading } = useExercisesQuery();
    const { mutate } = useExercisesMutation();

    const onSubmit = (data: ExercisesBody): void => {
        mutate(data, {
            onSuccess: () => {
                reset();
                refetch();
            },
        });
    };

    return (
        <>
            <Heading mb={6}>Додати нову вправу</Heading>

            <form action="new-item-page/new-exercises-page#" onSubmit={handleSubmit(onSubmit)}>
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
                        Додати вправу
                    </Button>
                </Flex>
            </form>

            <ExercisesList title="Вже існуючі вправи" isLoading={isLoading} list={data ?? []} />
        </>
    );
};

export default NewExercisesPage;
