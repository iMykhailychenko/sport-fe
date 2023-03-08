import { Calendar } from '../../components/calendar';
import { TodayTraining } from '../../components/today-training';
import { useDateQuery } from '../../query/dates/dates.hook';

const CalendarPage = (): JSX.Element => {
    const { data, isLoading } = useDateQuery();

    return (
        <>
            <Calendar />
            <TodayTraining data={data} isLoading={isLoading} />
        </>
    );
};

export default CalendarPage;
