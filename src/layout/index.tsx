import React from 'react';

import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import { Header } from './components/header';
import { Navigation } from './components/navigation';

export const Layout = (): JSX.Element => {
    return (
        <>
            <Box p={2} pb="100px" maxW={600} mx="auto">
                <Header />
                <Outlet />
            </Box>
            <Navigation />
        </>
    );
};
