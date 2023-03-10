import React, { ChangeEvent, useState } from 'react';

import { Flex, FormControl, FormLabel, IconButton, Select, Skeleton } from '@chakra-ui/react';
import { HiOutlinePlusSm } from 'react-icons/all';

import { ID } from '../../../types/api';

interface Props {
    title: string;
    placeholder: string;
    isLoading: boolean;
    data?: { id: ID; title: string }[];
    onSubmit: (value: ID) => void;
}
export const SelectItem = ({ title, placeholder, data = [], isLoading, onSubmit }: Props): JSX.Element => {
    const [selected, setSelected] = useState<ID | undefined>(undefined);
    const onSelect = (event: ChangeEvent<HTMLSelectElement>): void => setSelected(event.target.value);

    const handleSubmit = (): void => {
        if (selected) {
            onSubmit(selected);
            setSelected(undefined);
        }
    };

    return (
        <FormControl mb={6}>
            <FormLabel>{title}</FormLabel>
            <Flex alignItems="center">
                {isLoading ? (
                    <Skeleton w="100%" h={10} />
                ) : (
                    <Select w="100%" placeholder={placeholder} value={selected} onChange={onSelect}>
                        {data.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.title}
                            </option>
                        ))}
                    </Select>
                )}

                <IconButton
                    ml={2}
                    aria-label={title}
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
