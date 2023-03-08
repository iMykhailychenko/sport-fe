import { ReactNode, useCallback } from 'react';

import { Flex, IconButton } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/all';

import { useDate } from '../context/date.context';

interface Props {
    children: ReactNode;
}
export const DateNav = ({ children }: Props): JSX.Element => {
    const { setDay, totalDays } = useDate();

    const onPrev = useCallback((): void => {
        setDay(prev => {
            if (prev <= 1) {
                return totalDays;
            }

            return prev - 1;
        });
    }, []);

    const onNext = useCallback((): void => {
        setDay(prev => {
            if (prev >= totalDays) {
                return 1;
            }

            return prev + 1;
        });
    }, [totalDays]);

    return (
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <IconButton aria-label="Попередній день" onClick={onPrev}>
                <FiChevronLeft />
            </IconButton>

            {children}

            <IconButton aria-label="Наступний день" onClick={onNext}>
                <FiChevronRight />
            </IconButton>
        </Flex>
    );
};
