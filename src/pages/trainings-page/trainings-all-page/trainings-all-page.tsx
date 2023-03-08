import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Heading,
    Box,
    Stack,
    Skeleton,
    Text,
    Button,
    Center,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { CgMathPlus } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { useTrainingsQuery } from '../../../query/trainings/trainings.hook';

import { TrainingsItem } from './components/trainings-item';

const myRange = range(6);

const TrainingsAllPage = (): JSX.Element => {
    const { data, isLoading } = useTrainingsQuery();

    if (isLoading) {
        return (
            <Stack spacing={6}>
                {myRange.map(index => (
                    <Skeleton key={index} h={8} w="100%" />
                ))}
            </Stack>
        );
    }

    return (
        <>
            <Center mb={6}>
                <Button as={Link} to="/new/trainings" leftIcon={<CgMathPlus />}>
                    Додати нове тренування
                </Button>
            </Center>

            {data?.length ? (
                <Accordion allowToggle>
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

                                    <AccordionPanel pb={4} px={0}>
                                        {isExpanded && <TrainingsItem id={item.id} />}
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <Center alignItems="center" flexDir="column" h="80vh">
                    <Text mb={10}>У вас немає тренуваннь</Text>
                    <Button as={Link} to="/new/trainings">
                        Створити нове тренування
                    </Button>
                </Center>
            )}
        </>
    );
};

export default TrainingsAllPage;
