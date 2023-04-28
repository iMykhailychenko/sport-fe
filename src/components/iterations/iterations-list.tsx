import { HStack, Button } from '@chakra-ui/react';
import { FiInfo, RiDeleteBinLine } from 'react-icons/all';
import { Link, useLocation } from 'react-router-dom';

import { useDateQuery, useDatesDeleteMutation } from '../../query/dates/dates.hook';
import { ID } from '../../types/api';
import { Accordion } from '../accordion';

import { IterationsItem } from './iterations-item';

export const IterationsList = (): JSX.Element => {
    const location = useLocation();
    const { data, refetch, isLoading } = useDateQuery();
    const { mutate } = useDatesDeleteMutation();

    const onDelete = (params: [ID, ID]): void => {
        mutate(params, {
            onSuccess: () => {
                refetch();
            },
        });
    };

    return (
        <Accordion isLoading={isLoading} data={data ?? []} header={item => item.title}>
            {item => (
                <>
                    <HStack spacing={2} mt={2} mb={4}>
                        <Button size="sm" leftIcon={<RiDeleteBinLine />} onClick={() => onDelete([item.id, item.exercise_id])}>
                            Видалити
                        </Button>
                        <Button
                            size="sm"
                            as={Link}
                            leftIcon={<FiInfo />}
                            state={{ from: location }}
                            to={`/exercises/${item.exercise_id}`}
                        >
                            Деталі вправи
                        </Button>
                    </HStack>

                    <IterationsItem date_id={item.id} exercise_id={item.exercise_id} />
                </>
            )}
        </Accordion>
    );
};
