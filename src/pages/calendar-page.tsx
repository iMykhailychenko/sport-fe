import { Box, useDisclosure, Collapse, Button, Center } from '@chakra-ui/react';

import { AddExerciseToCalendar } from '../components/add-exercise-to-calendar';
import { Calendar } from '../components/calendar';
import { IterationsList } from '../components/iterations/iterations-list';

const CalendarPage = (): JSX.Element => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <>
            <Calendar />

            <Box my={10}>
                <IterationsList />
            </Box>

            <Center my={5}>
                <Button onClick={onToggle}>{isOpen ? 'Згорнути' : 'Додати вправу'}</Button>
            </Center>

            <Collapse in={isOpen} animateOpacity>
                <AddExerciseToCalendar />
            </Collapse>
        </>
    );
};

export default CalendarPage;
