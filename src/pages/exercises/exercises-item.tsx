import { useCallback, useMemo, lazy, Suspense } from 'react';

import { Heading, IconButton, Tr, Skeleton } from '@chakra-ui/react';
import { RiCalendarEventLine } from 'react-icons/all';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { Table, Td } from '../../components/table';
import { useDate } from '../../context/date.context';
import { useExerciseQuery } from '../../query/exercises/exercises.hook';
import { useIterationsExerciseQuery } from '../../query/iterations/iterations.hook';
import { ExerciseIterations } from '../../query/iterations/iterations.type';
import { ID } from '../../types/api';

const Chart = lazy(() => import('../../components/chart'));

const header = ['Повтор', 'Вага', 'Час', ''];

const ExercisesItem = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const exerciseId = params.exerciseId as ID;

    const { setDateFromString } = useDate();
    const { data: exerciseData } = useExerciseQuery(exerciseId);
    const { data = [], isLoading } = useIterationsExerciseQuery(exerciseId);

    const normalizedData = useMemo(() => {
        return data.reduce((prev, item) => {
            if (prev[item.date]) {
                prev[item.date].push(item);
            } else {
                prev[item.date] = [item];
            }
            return prev;
        }, {} as Record<string, ExerciseIterations[]>);
    }, [data]);

    const openCalendar = useCallback((date: string): void => {
        setDateFromString(date);
        navigate('/calendar', { state: { from: location } });
    }, []);

    if (!isLoading && !data?.length) {
        return (
            <>
                <Skeleton isLoaded={Boolean(exerciseData?.title)} mb={6}>
                    <Heading size="md">{exerciseData?.title}</Heading>
                </Skeleton>
                <Heading size="md" my={5}>
                    У вас немає данних про цю вправу...
                </Heading>
            </>
        );
    }

    return (
        <>
            <Skeleton isLoaded={Boolean(exerciseData?.title)} mb={6}>
                <Heading size="md">{exerciseData?.title}</Heading>
            </Skeleton>

            {exerciseData && !isLoading && (
                <Suspense fallback={null}>
                    <Chart data={normalizedData} name={exerciseData.title} />
                </Suspense>
            )}

            {Object.entries(normalizedData).map(([date, value], index) => (
                <Table<ExerciseIterations>
                    key={date}
                    data={value}
                    isLoading={isLoading}
                    header={index === 0 ? header : undefined}
                >
                    {(item, innerIndex) => (
                        <>
                            {innerIndex === 0 && (
                                <Tr>
                                    <Td colSpan={4} fontWeight="700" py={5}>
                                        {item.date}
                                    </Td>
                                </Tr>
                            )}

                            <Tr>
                                <Td w="35%">{item.repeat || '-'}</Td>
                                <Td w="35%">{item.weight || '-'}</Td>
                                <Td w="35%">{item.time || '-'}</Td>
                                <Td>
                                    <IconButton aria-label="Відкрити календар" onClick={() => openCalendar(item.date)} size="sm">
                                        <RiCalendarEventLine />
                                    </IconButton>
                                </Td>
                            </Tr>
                        </>
                    )}
                </Table>
            ))}
        </>
    );
};

export default ExercisesItem;
