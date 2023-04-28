import React from 'react';

import { Button, Flex, Heading, IconButton } from '@chakra-ui/react';
import { BiEdit, HiOutlinePlusSm, RiDeleteBinLine } from 'react-icons/all';
import { Link, useLocation } from 'react-router-dom';

import { Accordion } from '../../components/accordion';
import { useTrainingsAllQuery, useTrainingsDeleteMutation } from '../../query/trainings/trainings.hook';
import { TrainingsType } from '../../query/trainings/trainings.type';
import { ID } from '../../types/api';

import { ExercisesList } from './components/exercises-list';

const Trainings = (): JSX.Element => {
    const location = useLocation();
    const { data, isLoading, refetch } = useTrainingsAllQuery();
    const { mutate } = useTrainingsDeleteMutation();

    const onDelete = (id: ID): void => {
        mutate(id, { onSuccess: () => refetch() });
    };

    return (
        <>
            <Flex justifyContent="space-between" alignItems="center" mb={6}>
                <Heading size="md">Список тренувань</Heading>

                <IconButton as={Link} state={{ from: location }} aria-label="Додати нову вправу" to="/trainings/new" size="sm">
                    <HiOutlinePlusSm />
                </IconButton>
            </Flex>

            <Accordion<TrainingsType> isLoading={isLoading} data={data ?? []} header={item => item.title}>
                {item => (
                    <>
                        <Flex alignItems="center">
                            <Button size="sm" mr={4} rightIcon={<RiDeleteBinLine />} onClick={() => onDelete(item.id)}>
                                Видалити
                            </Button>

                            <Button
                                size="sm"
                                rightIcon={<BiEdit />}
                                as={Link}
                                state={{ from: location }}
                                to={`/trainings/${item.id}`}
                            >
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
