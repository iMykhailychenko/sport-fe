import { memo } from 'react';

import {
    Box,
    Skeleton,
    Stack,
    Heading,
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    AccordionIcon,
} from '@chakra-ui/react';
import { range } from 'lodash-es';

import { useTrainingExercisesQuery } from '../../../query/exercises/exercises.hook';
import { ID } from '../../../types/api';

import { Iterations } from './iterations';

const myRange = range(6);

interface Props {
    date_id: ID;
    training_id: ID;
}
export const DateTraining = memo(({ date_id, training_id }: Props): JSX.Element => {
    const { data, isLoading } = useTrainingExercisesQuery(training_id);

    if (isLoading) {
        return (
            <Stack spacing={6} mt={6}>
                {myRange.map(index => (
                    <Skeleton key={index} h={10} w="100%" />
                ))}
            </Stack>
        );
    }

    return (
        <Accordion mt={6} allowToggle>
            {data?.map(item => (
                <AccordionItem key={item.id}>
                    {({ isExpanded }) => (
                        <>
                            <Heading>
                                <AccordionButton py={5}>
                                    <Box as="span" flex="1" textAlign="left">
                                        {item.title}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Heading>
                            <AccordionPanel pb={4}>
                                {isExpanded && <Iterations date_id={date_id} exercise_id={item.id} />}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            ))}
        </Accordion>
    );
});

DateTraining.displayName = 'DateTraining';
