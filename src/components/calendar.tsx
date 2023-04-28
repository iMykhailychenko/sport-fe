import React, { ChangeEvent, useCallback, useMemo } from 'react';

import { Button, Grid, Text, Select } from '@chakra-ui/react';
import { range } from 'lodash-es';

import { useDate } from '../context/date.context';
import { useDatesCalendarQuery } from '../query/dates/dates.hook';
import { allYears, monthList, weekList } from '../utils/calendar';

import { DateNavigation } from './date-navigation';

export const Calendar = (): JSX.Element => {
    const { day, month, year, setDay, setMonth, setYear, totalDays } = useDate();
    const { data = [] } = useDatesCalendarQuery();

    const onChangeYear = useCallback((event: ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value)), []);
    const onChangeMonth = useCallback((event: ChangeEvent<HTMLSelectElement>) => setMonth(Number(event.target.value)), []);

    const currentMonthArray = useMemo(() => range(1, totalDays + 1), [totalDays]);
    const prevMonthArray = useMemo(() => range(new Date(year, month, 0).getDay()), [year, month, totalDays]);

    return (
        <>
            <DateNavigation>
                <Select placeholder="Select year" value={year} onChange={onChangeYear} w="33%">
                    {allYears.map(y => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </Select>

                <Select placeholder="Select month" value={month} onChange={onChangeMonth} w="33%">
                    {monthList.map((m, i) => (
                        <option key={m} value={i}>
                            {m}
                        </option>
                    ))}
                </Select>
            </DateNavigation>

            <Grid templateColumns="repeat(7, 1fr)" gap={1}>
                {weekList.map(d => (
                    <Text p={2} key={d}>
                        {d}
                    </Text>
                ))}

                {prevMonthArray.map(d => (
                    <span key={d + 'prev'} />
                ))}

                {currentMonthArray.map(d => {
                    const isTrainingDay = data.includes(`${d}-${month}-${year}`);
                    return (
                        <Button
                            key={d}
                            onClick={() => setDay(d)}
                            color={isTrainingDay ? 'blue.500' : undefined}
                            colorScheme={day === d ? 'blue' : 'gray'}
                            variant={isTrainingDay ? 'outline' : 'solid'}
                        >
                            {d}
                        </Button>
                    );
                })}
            </Grid>
        </>
    );
};
