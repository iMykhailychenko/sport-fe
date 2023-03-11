import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useMemo, useState } from 'react';

import { Day, Month, Year } from '../types/date';
import { date } from '../utils/calendar';

interface DateContextType {
    day: Day;
    setDay: Dispatch<SetStateAction<Day>>;
    month: Month;
    setMonth: Dispatch<SetStateAction<Month>>;
    year: Year;
    setYear: Dispatch<SetStateAction<Year>>;
    onReset: () => void;
    totalDays: number;
    dateFormat: string;
    setDateFromString: (date: string) => void;
}
export const DateContext = createContext<DateContextType>({} as DateContextType);

export const DateProvider = ({ children }: Record<'children', ReactNode>) => {
    const [day, setDay] = useState<Day>(() => date.getDate());
    const [month, setMonth] = useState<Day>(() => date.getMonth());
    const [year, setYear] = useState<Year>(() => date.getFullYear());
    const dateFormat = `${day}-${month}-${year}`;

    const onReset = useCallback(() => {
        setYear(date.getFullYear());
        setMonth(date.getMonth());
        setDay(date.getDate());
    }, []);

    const totalDays = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);

    const setDateFromString = useCallback((date: string): void => {
        const [day, month, year] = date.split('-');
        if (day) setDay(Number(day));
        if (month) setMonth(Number(month));
        if (year) setYear(Number(year));
    }, []);

    return (
        <DateContext.Provider
            value={{ day, setDay, month, setMonth, year, setYear, onReset, totalDays, dateFormat, setDateFromString }}
        >
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => useContext(DateContext);
