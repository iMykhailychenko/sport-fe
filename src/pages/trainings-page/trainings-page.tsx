import { Button, Center } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { DateNav } from '../../components/date-nav';

const TrainingsPage = (): JSX.Element => {
    return (
        <>
            <DateNav />

            <Center>
                <Button as={Link} to="/trainings/all" rightIcon={<FiChevronRight />}>
                    Дивитись всі тренування
                </Button>
            </Center>
        </>
    );
};

export default TrainingsPage;
