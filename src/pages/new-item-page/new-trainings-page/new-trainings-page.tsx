import { useState, useMemo, useCallback, ChangeEvent } from 'react';

import {
    Box,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    InputLeftElement,
    InputGroup,
    Center,
    Button,
    useColorMode,
    useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { CgMathPlus, CgMathMinus, RiSearch2Line } from 'react-icons/all';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { errorToast } from '../../../config/toast.config';
import { useExercisesQuery } from '../../../query/exercises/exercises.hook';
import { ExercisesType } from '../../../query/exercises/exercises.type';
import { useTrainingsMutation } from '../../../query/trainings/trainings.hook';

import { ExercisesList } from './components/exercises-list';

const TrainingSchema = object({
    title: string().min(3, 'Дуже коротка назва').required('Обовʼязкове поле'),
});

interface FormData {
    title: string;
}

const NewTrainingsPage = (): JSX.Element => {
    const toast = useToast();
    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(TrainingSchema) });

    const { mutate } = useTrainingsMutation();
    const { data, isLoading } = useExercisesQuery();

    const [search, setSearch] = useState('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    };

    const [selectedExercises, setSelectedExercises] = useState<ExercisesType[]>([]);
    const removeExercise = useCallback((item: ExercisesType) => {
        setSelectedExercises(prev => prev.filter(({ id }) => id !== item.id));
    }, []);
    const addExercise = useCallback((item: ExercisesType) => {
        setSelectedExercises(prev => [...prev, item]);
    }, []);

    const onSubmit = (data: FormData): void => {
        if (!selectedExercises.length) {
            toast({ ...errorToast, description: 'Додайте принайні одну вправу' });
            return;
        }

        mutate(
            { ...data, exercises: selectedExercises.map(item => item.id) },
            {
                onSuccess: () => {
                    reset();
                    navigate('/trainings/all');
                },
            },
        );
    };

    const filteredExercises = useMemo(() => {
        return (
            data?.filter(
                ({ id, title }) =>
                    !selectedExercises.some(item => item.id === id) &&
                    title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
            ) ?? []
        );
    }, [data, selectedExercises, search]);

    return (
        <>
            <form action="new-item-page/new-trainings-page#" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired isInvalid={Boolean(errors.title)}>
                    <FormLabel>Назва тренування</FormLabel>
                    <Input autoFocus type="text" placeholder="Тренування А" {...register('title', { required: true })} />
                    <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
                </FormControl>
                <Center
                    p={4}
                    w="100%"
                    left={0}
                    bottom={20}
                    position="fixed"
                    borderTop="1px"
                    zIndex={10}
                    bg={isDark ? 'gray.800' : 'white'}
                    borderColor={isDark ? 'gray.600' : 'gray.200'}
                >
                    <Button type="submit" colorScheme="blue">
                        Створити програму
                    </Button>
                </Center>
            </form>

            {selectedExercises.length ? (
                <ExercisesList
                    title="Відібрані вправи"
                    icon={<CgMathMinus />}
                    isLoading={isLoading}
                    onSelect={removeExercise}
                    list={selectedExercises}
                />
            ) : null}

            <ExercisesList
                title="Всі вправи"
                icon={<CgMathPlus />}
                isLoading={isLoading}
                onSelect={addExercise}
                list={filteredExercises ?? []}
                input={
                    <InputGroup mb={4}>
                        <InputLeftElement pointerEvents="none">
                            <RiSearch2Line />
                        </InputLeftElement>
                        <Input type="search" value={search} onChange={handleChange} placeholder="Шукати вправу" />
                    </InputGroup>
                }
            />

            <Box h="100px" />
        </>
    );
};

export default NewTrainingsPage;
