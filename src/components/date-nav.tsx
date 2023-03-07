import { Flex, Button } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/all';

import { useDate } from '../context/date.context';

export const DateNav = (): JSX.Element => {
    const { setDay, totalDays } = useDate();

    const onPrev = (): void => {
        setDay(prev => (prev <= 0 ? prev : prev - 1));
    };

    const onNext = (): void => {
        setDay(prev => (prev >= totalDays ? prev : prev + 1));
    };

    return (
        <Flex alignItems="center" justifyContent="space-between" mb={4}>
            <Button leftIcon={<FiChevronLeft />} onClick={onPrev} variant="ghost" colorScheme="blue">
                Попередній день
            </Button>
            <Button rightIcon={<FiChevronRight />} onClick={onNext} variant="ghost" colorScheme="blue">
                Наступний день
            </Button>
        </Flex>
    );
};
