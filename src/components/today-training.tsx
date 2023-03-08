import { Center, Spinner } from '@chakra-ui/react';

import { DateTraining } from '../pages/calendar-page/components/date-training';
import { NewDate } from '../pages/calendar-page/components/new-date';
import { DateType } from '../query/dates/dates.type';

interface Props {
    isLoading: boolean;
    data?: DateType;
}
export const TodayTraining = ({ data, isLoading }: Props): JSX.Element => {
    return (
        <>
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
