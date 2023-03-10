import { AddExerciseToCalendar } from '../../components/add-exercise-to-calendar';
import { IterationsList } from '../../components/iterations/iterations-list';

const TodayTraining = (): JSX.Element => {
    return (
        <>
            <IterationsList />
            <AddExerciseToCalendar />
        </>
    );
};

export default TodayTraining;
