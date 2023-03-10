import React, { useState } from 'react';

import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    IconButton,
    useToast,
    Flex,
    Box,
    Text,
    InputGroup,
    InputLeftElement,
    Tr,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { FcApproval, HiOutlineMinusSm, HiOutlinePlusSm, RiSearchLine } from 'react-icons/all';
import { object, string } from 'yup';

import { FloatingButton } from '../../../components/floating-button';
import { Table, Td } from '../../../components/table';
import { errorToast, successToast } from '../../../config/toast.config';
import { useFuseInput } from '../../../hooks/fuse.hook';
import { useExercisesAllQuery } from '../../../query/exercises/exercises.hook';
import { ExercisesType } from '../../../query/exercises/exercises.type';
import { TrainingsBody } from '../../../query/trainings/trainings.type';
import { ID } from '../../../types/api';

const TrainingSchema = object({
    title: string().min(3, 'Дуже коротка назва').required('Обовʼязкове поле'),
});

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

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ defaultValues, resolver: yupResolver(TrainingSchema) });

    const { data, isLoading } = useExercisesAllQuery();
    const { search, list, onChange } = useFuseInput(data, ['title']);

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
                <FloatingButton>{buttonLabel}</FloatingButton>
            </form>

            <Heading size="md" mt={10} mb={5}>
                Додайте вправу
            </Heading>

            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <RiSearchLine />
                </InputLeftElement>
                <Input type="search" value={search} onChange={onChange} placeholder="Шукати" />
            </InputGroup>

            <Table<ExercisesType> data={list} isLoading={isLoading}>
                {item => {
                    const isIncluded = selectedExercises.includes(item.id);
                    return (
                        <Tr>
                            <Td w="100%">
                                <Flex alignItems="center">
                                    {isIncluded && (
                                        <Box mr={2} mt={0.5} fontSize="lg">
                                            <FcApproval />
                                        </Box>
                                    )}
                                    <Text noOfLines={1} display="block" maxWidth="73vw">
                                        {item.title}
                                    </Text>
                                </Flex>
                            </Td>
                            <Td>
                                <IconButton
                                    size="sm"
                                    aria-label={isIncluded ? 'Видалити вправу' : 'Додати вправу'}
                                    onClick={() => (isIncluded ? onRemoveExercise(item.id) : onAddExercise(item.id))}
                                >
                                    {isIncluded ? <HiOutlineMinusSm /> : <HiOutlinePlusSm />}
                                </IconButton>
                            </Td>
                        </Tr>
                    );
                }}
            </Table>

            <Box h="150px" />
        </>
    );
};
