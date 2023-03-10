import { Stack } from '@chakra-ui/react';
import { FcPlanner, FcLike, FcWorkflow, FcList } from 'react-icons/all';

import { MenuItem } from './components/menu-item';

const Home = (): JSX.Element => {
    return (
        <Stack spacing={3}>
            <MenuItem to="/trainings/today" label="Почати тренування">
                <FcLike />
            </MenuItem>

            <MenuItem to="/calendar" label="Календар">
                <FcPlanner />
            </MenuItem>

            <MenuItem to="/trainings" label="Список тренувань">
                <FcWorkflow />
            </MenuItem>

            <MenuItem to="/exercises" label="Список вправ">
                <FcList />
            </MenuItem>
        </Stack>
    );
};

export default Home;
