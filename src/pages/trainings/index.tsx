import React from 'react';

import { Button, Flex, Heading, IconButton } from '@chakra-ui/react';
import { BiEdit, HiOutlinePlusSm, RiDeleteBinLine } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { Accordion } from '../../components/accordion';
import { useTrainingsAllQuery, useTrainingsDeleteMutation } from '../../query/trainings/trainings.hook';
import { TrainingsType } from '../../query/trainings/trainings.type';
import { ID } from '../../types/api';

import { ExercisesList } from './components/exercises-list';

const Trainings = (): JSX.Element => {
    const { data, isLoading, refetch } = useTrainingsAllQuery();
    const { mutate } = useTrainingsDeleteMutation();

    const onDelete = (id: ID): void => {
        mutate(id, { onSuccess: () => refetch() });
    };

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading size="md">Список тренувань</Heading>

                <IconButton as={Link} aria-label="Додати нову вправу" to="/trainings/new">
                    <HiOutlinePlusSm />
                </IconButton>
            </Flex>

            <Accordion<TrainingsType> isLoading={isLoading} data={data ?? []} header={item => item.title}>
                {item => (
                    <>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Button w="49%" rightIcon={<RiDeleteBinLine />} onClick={() => onDelete(item.id)}>
                                Видалити
                            </Button>

                            <Button w="49%" rightIcon={<BiEdit />} as={Link} to={`/trainings/${item.id}`}>
                                Редагувати
                            </Button>
                        </Flex>

                        <ExercisesList id={item.id} />
                    </>
                )}
            </Accordion>
        </>
    );
};

export default Trainings;
