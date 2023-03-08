import { Button } from '@chakra-ui/react';
import { RiListCheck2 } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { DateNav } from '../../components/date-nav';
import { TodayTraining } from '../../components/today-training/today-training';
import { useDateQuery } from '../../query/dates/dates.hook';

const TrainingsPage = (): JSX.Element => {
    const { data, isLoading, isError } = useDateQuery();

    return (
        <>
            <DateNav>
                <Button as={Link} to="/trainings/all" variant="outline" rightIcon={<RiListCheck2 />}>
                    Всі тренування
                </Button>
            </DateNav>

            <TodayTraining data={data} isLoading={isLoading} isError={isError} />
        </>
    );
};

export default TrainingsPage;
