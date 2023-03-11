import { HStack, Button } from '@chakra-ui/react';
import { FiInfo, RiDeleteBinLine } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { useDateQuery, useDatesDeleteMutation } from '../../query/dates/dates.hook';
import { ID } from '../../types/api';
import { Accordion } from '../accordion';

import { IterationsItem } from './iterations-item';

export const IterationsList = (): JSX.Element => {
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
                    <HStack spacing={2} my={4}>
                        <Button leftIcon={<RiDeleteBinLine />} onClick={() => onDelete([item.id, item.exercise_id])}>
                            Видалити
                        </Button>
                        <Button leftIcon={<FiInfo />} as={Link} to={`/exercises/${item.id}`}>
                            Деталі вправи
                        </Button>
                    </HStack>
                    <IterationsItem date_id={item.id} exercise_id={item.exercise_id} />
                </>
            )}
        </Accordion>
    );
};
