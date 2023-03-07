import { Spinner, Center } from '@chakra-ui/react';

import { Calendar } from '../../components/calendar';
import { useDateQuery } from '../../query/dates/dates.hook';

import { DateTraining } from './components/date-training';
import { NewDate } from './components/new-date';

const CalendarPage = (): JSX.Element => {
    const { data, isLoading } = useDateQuery();

    return (
        <>
            <Calendar />

            {isLoading && (
                <Center my={20}>
                    <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                </Center>
            )}

            {!isLoading && !data && <NewDate />}

            {!isLoading && data?.trainingId && <DateTraining trainingId={data.trainingId} />}
        </>
    );
};

export default CalendarPage;
