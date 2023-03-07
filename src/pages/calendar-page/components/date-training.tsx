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
    trainingId: ID;
}
export const DateTraining = memo(({ trainingId }: Props): JSX.Element => {
    const { data, isLoading } = useTrainingExercisesQuery(trainingId);

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
                                {isExpanded && <Iterations exerciseId={item.id} trainingId={trainingId} />}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            ))}
        </Accordion>
    );
});

DateTraining.displayName = 'DateTraining';
