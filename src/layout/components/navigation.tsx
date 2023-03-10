import React from 'react';

import { Grid, useColorMode } from '@chakra-ui/react';
import { FcHome, FcSportsMode, FcCalendar, FcPlus } from 'react-icons/all';

import { NavigationLink } from './navigation-link';

export const Navigation = (): JSX.Element => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    const borderColor = isDark ? 'gray.600' : 'gray.200';

    return (
        <Grid
            w="100%"
            h={20}
            left={0}
            bottom={0}
            position="fixed"
            borderTop="1px"
            borderColor={borderColor}
            templateColumns="repeat(4, 1fr)"
        >
            <NavigationLink to="/" borderRight="1px" borderColor={borderColor}>
                <FcHome />
            </NavigationLink>

            <NavigationLink to="/trainings/today" borderRight="1px" borderColor={borderColor}>
                <FcSportsMode />
            </NavigationLink>

            <NavigationLink to="/calendar" borderRight="1px" borderColor={borderColor}>
                <FcCalendar />
            </NavigationLink>

            <NavigationLink to="/new">
                <FcPlus />
            </NavigationLink>
        </Grid>
    );
};
