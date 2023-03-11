import { Heading, IconButton, Tr, Skeleton } from '@chakra-ui/react';
import { RiCalendarEventLine } from 'react-icons/all';
import { useNavigate, useParams } from 'react-router-dom';

import { Table, Td } from '../../components/table';
import { useDate } from '../../context/date.context';
import { useExerciseQuery } from '../../query/exercises/exercises.hook';
import { useIterationsExerciseQuery } from '../../query/iterations/iterations.hook';
import { ExerciseIterations } from '../../query/iterations/iterations.type';
import { ID } from '../../types/api';

const header = ['Повтор', 'Вага', 'Час', ''];

const ExercisesItem = (): JSX.Element => {
    const navigate = useNavigate();
    const params = useParams();
    const exerciseId = params.exerciseId as ID;

    const { setDateFromString } = useDate();
    const { data: exerciseData } = useExerciseQuery(exerciseId);
    const { data, isLoading } = useIterationsExerciseQuery(exerciseId);

    if (!isLoading && !data?.length) {
        return (
            <>
                <Skeleton isLoaded={Boolean(exerciseData?.title)} mb={6}>
                    <Heading size="lg">{exerciseData?.title}</Heading>
                </Skeleton>
                <Heading my={10}>У вас немає данних про цю вправу.</Heading>
            </>
        );
    }

    const openCalendar = (date: string): void => {
        setDateFromString(date);
        navigate('/calendar');
    };

    return (
        <>
            <Skeleton isLoaded={Boolean(exerciseData?.title)} mb={6}>
                <Heading size="lg">{exerciseData?.title}</Heading>
            </Skeleton>

            <Table<ExerciseIterations> isLoading={isLoading} data={data ?? []} header={header}>
                {(item, index) => (
                    <>
                        {item.date !== data?.[index - 1]?.date && (
                            <Tr>
                                <Td colSpan={4} fontWeight="700">
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
        </>
    );
};

export default ExercisesItem;
