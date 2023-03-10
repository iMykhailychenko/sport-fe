import React, { useState } from 'react';

import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    IconButton,
    useColorMode,
    useToast,
    Flex,
    Box,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { FcApproval, HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/all';
import { object, string } from 'yup';

import { Table, Td } from '../../../components/table';
import { errorToast, successToast } from '../../../config/toast.config';
import { useAllExercisesQuery } from '../../../query/exercises/exercises.hook';
import { ExercisesType } from '../../../query/exercises/exercises.type';
import { TrainingsBody } from '../../../query/trainings/trainings.type';
import { ID } from '../../../types/api';

const TrainingSchema = object({
    title: string().min(3, 'Дуже коротка назва').required('Обовʼязкове поле'),
});

const header = ['Назва', ''];

interface FormData {
    title: string;
}

interface Props {
    selected?: ID[];
    buttonLabel: string;
    defaultValues?: Partial<FormData>;
    onSubmit: (data: TrainingsBody) => Promise<void>;
}
export const TrainingForm = ({ defaultValues, buttonLabel, onSubmit, selected = [] }: Props): JSX.Element => {
    const toast = useToast();
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ defaultValues, resolver: yupResolver(TrainingSchema) });

    const { data, isLoading } = useAllExercisesQuery();

    const [selectedExercises, setSelectedExercises] = useState<ID[]>(selected);
    const onAddExercise = (id: ID): void => setSelectedExercises(prev => [...prev, id]);
    const onRemoveExercise = (id: ID): void => setSelectedExercises(prev => prev.filter(item => item !== id));

    const innerSubmit = (data: FormData): void => {
        if (!selectedExercises.length) {
            toast({ ...errorToast, description: 'Додайте принайні одну вправу' });
            return;
        }

        onSubmit({ ...data, exercises: selectedExercises }).then(() => {
            toast({ ...successToast, description: 'Все прошло успішно' });
        });
    };

    return (
        <>
            <form action="#" onSubmit={handleSubmit(innerSubmit)}>
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
                        {buttonLabel}
                    </Button>
                </Center>
            </form>

            <Heading size="md" mt={10} mb={5}>
                Додайте вправу
            </Heading>
            <Table<ExercisesType> data={data ?? []} isLoading={isLoading} header={header}>
                {item => {
                    const isIncluded = selectedExercises.includes(item.id);
                    return (
                        <>
                            <Td w="100%">
                                <Flex alignItems="center">
                                    {isIncluded && (
                                        <Box mr={2} mt={0.5} fontSize="lg">
                                            <FcApproval />
                                        </Box>
                                    )}
                                    {item.title}
                                </Flex>
                            </Td>
                            <Td>
                                <IconButton
                                    aria-label={isIncluded ? 'Видалити вправу' : 'Додати вправу'}
                                    onClick={() => (isIncluded ? onRemoveExercise(item.id) : onAddExercise(item.id))}
                                >
                                    {isIncluded ? <HiOutlineMinusSm /> : <HiOutlinePlusSm />}
                                </IconButton>
                            </Td>
                        </>
                    );
                }}
            </Table>
        </>
    );
};
