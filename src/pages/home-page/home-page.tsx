import { Stack } from '@chakra-ui/react';
import { FcPlanner, FcLike, FcPlus, FcRules } from 'react-icons/all';

import { MenuItem } from '../../components/menu-item';

const HomePage = (): JSX.Element => {
    return (
        <Stack spacing={3}>
            <MenuItem to="/trainings" label="Почати тренування">
                <FcLike />
            </MenuItem>

            <MenuItem to="/calendar" label="Календар">
                <FcPlanner />
            </MenuItem>

            <MenuItem to="/new" label="Створити">
                <FcPlus />
            </MenuItem>

            <MenuItem to="/trainings/all" label="Список тренувань">
                <FcRules />
            </MenuItem>
        </Stack>
    );
};

export default HomePage;
