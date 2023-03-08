import { Stack, Skeleton, Spinner } from '@chakra-ui/react';
import { range } from 'lodash-es';

import { DateType } from '../../query/dates/dates.type';

import { DateTraining } from './components/date-training';
import { NewDate } from './components/new-date';

const range4 = range(4);

interface Props {
    isLoading: boolean;
    isError: boolean;
    data?: DateType;
}

export const TodayTraining = ({ data, isLoading, isError }: Props): JSX.Element => {
    return (
        <>
            {isLoading && (
                <Stack spacing={4} my={10}>
                    {range4.map(index => (
                        <Skeleton key={index} w="100%" h={10} />
                    ))}
                </Stack>
            )}

            {((!isLoading && !data) || isError) && <NewDate />}

            {!isLoading && data?.training_id && <DateTraining training_id={data.training_id} date_id={data.id} />}
        </>
    );
};
