import { Box } from '@chakra-ui/react';

import { AddExerciseToCalendar } from '../components/add-exercise-to-calendar';
import { Calendar } from '../components/calendar';
import { IterationsList } from '../components/iterations/iterations-list';

const CalendarPage = (): JSX.Element => {
    return (
        <>
            <Calendar />
            <Box my={5} />
            <IterationsList />
            <AddExerciseToCalendar />
        </>
    );
};

export default CalendarPage;
