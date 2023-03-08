import React, { ChangeEvent, useCallback, useMemo } from 'react';

import { Button, Grid, Text, Select } from '@chakra-ui/react';
import { range } from 'lodash-es';

import { useDate } from '../context/date.context';
import { allYears, monthList, weekList } from '../utils/calendar';

import { DateNav } from './date-nav';

export const Calendar = (): JSX.Element => {
    const { day, month, year, setDay, setMonth, setYear, onReset, totalDays } = useDate();

    const onChangeYear = useCallback((event: ChangeEvent<HTMLSelectElement>) => setYear(Number(event.target.value)), []);
    const onChangeMonth = useCallback((event: ChangeEvent<HTMLSelectElement>) => setMonth(Number(event.target.value)), []);

    const currentMonthArray = useMemo(() => range(1, totalDays + 1), [totalDays]);
    const prevMonthArray = useMemo(() => range(new Date(year, month, 0).getDay()), [year, month, totalDays]);

    return (
        <>
            <DateNav>
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
            </DateNav>

            <Button w="100%" mb={4} onClick={onReset}>
                Повернутись до поточної дати
            </Button>

            <Grid templateColumns="repeat(7, 1fr)" gap={1}>
                {weekList.map(d => (
                    <Text p={2} key={d}>
                        {d}
                    </Text>
                ))}

                {prevMonthArray.map(d => (
                    <span key={d + 'prev'} />
                ))}

                {currentMonthArray.map(d => (
                    <Button key={d} colorScheme={day === d ? 'blue' : 'gray'} onClick={() => setDay(d)}>
                        {d}
                    </Button>
                ))}
            </Grid>
        </>
    );
};
