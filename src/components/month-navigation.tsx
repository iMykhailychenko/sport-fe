import { ReactNode, useCallback } from 'react';

import { Flex, IconButton } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/all';

import { useDate } from '../context/date.context';

interface Props {
    children: ReactNode;
}
export const MonthNavigation = ({ children }: Props): JSX.Element => {
    const { setMonth, setDay } = useDate();

    const onPrev = useCallback((): void => {
        setDay(1);
        setMonth(prev => {
            if (prev <= 1) {
                return 12;
            }

            return prev - 1;
        });
    }, []);

    const onNext = useCallback((): void => {
        setDay(1);
        setMonth(prev => {
            if (prev > 12) {
                return 1;
            }

            return prev + 1;
        });
    }, []);

    return (
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <IconButton aria-label="Попередній місяць" onClick={onPrev}>
                <FiChevronLeft />
            </IconButton>

            {children}

            <IconButton aria-label="Наступний місяць" onClick={onNext}>
                <FiChevronRight />
            </IconButton>
        </Flex>
    );
};
