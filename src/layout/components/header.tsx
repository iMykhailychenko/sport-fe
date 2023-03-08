import { useCallback, useMemo } from 'react';

import { Button, Flex, useColorMode, Heading, IconButton } from '@chakra-ui/react';
import { IoMdRefresh, FiChevronLeft, FcIdea, FcNoIdea } from 'react-icons/all';
import { Link, useLocation } from 'react-router-dom';

import { useDate } from '../../context/date.context';
import { monthList } from '../../utils/calendar';

export const Header = (): JSX.Element => {
    const { day, month, year, onReset } = useDate();

    const { pathname } = useLocation();
    const isHome = pathname === '/' || pathname === '';

    const { colorMode, setColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    const toggleMode = useCallback(() => setColorMode(isDark ? 'light' : 'dark'), [isDark]);

    const dayWithZero = String(day).padStart(2, '0');
    const monthWithZero = String(month + 1).padStart(2, '0');

    const backLink = useMemo(() => {
        const arr = pathname.split('/');
        return arr.slice(0, arr.length - 1).join('/') ?? '/';
    }, [pathname]);

    return (
        <Flex justifyContent="space-between" alignItems="center" pb={5}>
            <Flex alignItems="center">
                {!isHome && (
                    <Button as={Link} to={backLink} leftIcon={<FiChevronLeft />} mr={5}>
                        Назад
                    </Button>
                )}

                <IconButton fontSize="22px" onClick={onReset} aria-label="Повернутись до поточної дати">
                    <IoMdRefresh />
                </IconButton>

                <Heading as={Link} to="/calendar" size="md" ml={4}>
                    {isHome ? `${dayWithZero} ${monthList[month]} ${year}` : `${dayWithZero}-${monthWithZero}-${year}`}
                </Heading>
            </Flex>

            <IconButton aria-label="Змінити тему" onClick={toggleMode} fontSize="25px">
                {isDark ? <FcIdea /> : <FcNoIdea />}
            </IconButton>
        </Flex>
    );
};
