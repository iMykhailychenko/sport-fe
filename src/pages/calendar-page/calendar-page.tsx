import { useCallback } from 'react';

import { Center, Button } from '@chakra-ui/react';
import { RiDeleteBin6Line } from 'react-icons/all';

import { Calendar } from '../../components/calendar';
import { TodayTraining } from '../../components/today-training/today-training';
import { useDateQuery, useDeleteDatesMutation } from '../../query/dates/dates.hook';

const CalendarPage = (): JSX.Element => {
    const { data, isLoading, remove, isError } = useDateQuery();
    const { mutate } = useDeleteDatesMutation();

    const handleDelete = useCallback((): void => {
        if (data?.id) {
            mutate(data.id, {
                onSuccess: remove,
            });
        }
    }, [data?.id]);

    return (
        <>
            <Calendar />
            {data?.id && (
                <Center mt={6}>
                    <Button leftIcon={<RiDeleteBin6Line />} onClick={handleDelete}>
                        Видалити тренування в цей день
                    </Button>
                </Center>
            )}
            <TodayTraining data={data} isLoading={isLoading} isError={isError} />
        </>
    );
};

export default CalendarPage;
