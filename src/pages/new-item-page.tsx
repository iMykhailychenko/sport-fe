import { Box, Stack } from '@chakra-ui/react';
import { FcWorkflow, FcSportsMode } from 'react-icons/all';
import { Outlet } from 'react-router-dom';

import { MenuItem } from './home/components/menu-item';

const NewItemPage = (): JSX.Element => {
    return (
        <>
            <Stack spacing={3}>
                <MenuItem to="/trainings/new" label="Нове тренування">
                    <FcWorkflow />
                </MenuItem>

                <MenuItem to="/exercises/new" label="Нова вправа">
                    <FcSportsMode />
                </MenuItem>
            </Stack>

            <Box my={4}>
                <Outlet />
            </Box>
        </>
    );
};

export default NewItemPage;
