import React, { memo, useCallback } from 'react';

import { Box, Flex, IconButton, Text, Tr } from '@chakra-ui/react';
import { isEqual } from 'lodash-es';
import { FcApproval, HiOutlineMinusSm, HiOutlinePlusSm } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { useDate } from '../../../../context/date.context';
import { useDateQuery, useDatesCreateMutation, useDatesDeleteMutation } from '../../../../query/dates/dates.hook';
import { ExercisesType } from '../../../../query/exercises/exercises.type';
import { Td } from '../../../table';

interface Props {
    item: ExercisesType;
}
export const AddExerciseTable = memo(({ item }: Props): JSX.Element => {
    const { dateFormat } = useDate();
    const { data: selectedExercises, refetch } = useDateQuery();

    const { mutate: datesCreateMutation } = useDatesCreateMutation();
    const { mutate: datesDeleteMutation } = useDatesDeleteMutation();

    const dateItem = selectedExercises?.find(element => element.exercise_id === item.id);

    const onAddExercises = useCallback((): void => {
        datesCreateMutation(
            { date: dateFormat, exercise_id: item.id },
            {
                onSuccess: () => refetch(),
            },
        );
    }, [dateFormat]);

    const onDeleteExercises = useCallback((): void => {
        if (dateItem?.id) {
            datesDeleteMutation([dateItem.id, item.id], {
                onSuccess: () => refetch(),
            });
        }
    }, [dateItem]);

    return (
        <Tr>
            <Td w="100%">
                <Flex alignItems="center">
                    {dateItem && (
                        <Box mr={2} mt={0.5} fontSize="lg">
                            <FcApproval />
                        </Box>
                    )}
                    <Text as={Link} to={`/exercises/${item.id}`} noOfLines={1} display="block" maxWidth="73vw">
                        {item.title}
                    </Text>
                </Flex>
            </Td>
            <Td>
                <IconButton aria-label="Додати вправу" onClick={() => (dateItem ? onDeleteExercises() : onAddExercises())}>
                    {dateItem ? <HiOutlineMinusSm /> : <HiOutlinePlusSm />}
                </IconButton>
            </Td>
        </Tr>
    );
}, isEqual);

AddExerciseTable.displayName = 'AddExerciseTable';
