import React, { ChangeEvent, useCallback, useState } from 'react';

import { Flex, FormControl, IconButton, Select, Skeleton } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { HiOutlinePlusSm } from 'react-icons/all';

import { useDate } from '../../../context/date.context';
import { useDatesCreateAllMutation } from '../../../query/dates/dates.hook';
import { useTrainingsAllQuery } from '../../../query/trainings/trainings.hook';
import { ID } from '../../../types/api';

export const AddTraining = (): JSX.Element => {
    const { dateFormat } = useDate();
    const queryClient = useQueryClient();

    const { mutate } = useDatesCreateAllMutation();
    const { data, isLoading } = useTrainingsAllQuery();

    const [selected, setSelected] = useState<ID | undefined>(undefined);
    const onSelect = (event: ChangeEvent<HTMLSelectElement>): void => setSelected(event.target.value);

    const handleSubmit = useCallback((): void => {
        if (!selected) return;
        mutate(
            { date: dateFormat, training_id: selected },
            {
                onSuccess: () => {
                    queryClient.refetchQueries(['dates', dateFormat]);
                    setSelected(undefined);
                },
            },
        );
    }, [dateFormat, selected]);

    return (
        <FormControl mb={6}>
            <Flex alignItems="center">
                {isLoading ? (
                    <Skeleton w="100%" h={10} />
                ) : (
                    <Select w="100%" placeholder="Виберіть тренування" value={selected} onChange={onSelect}>
                        {data?.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </Select>
                )}

                <IconButton
                    ml={2}
                    aria-label="Додати тренування"
                    colorScheme="blue"
                    disabled={!selected}
                    opacity={selected ? 1 : 0.5}
                    onClick={handleSubmit}
                >
                    <HiOutlinePlusSm />
                </IconButton>
            </Flex>
        </FormControl>
    );
};
