import { IconButton } from '@chakra-ui/react';
import { SlOptions } from 'react-icons/all';

import { useIterationsQuery } from '../../query/iterations/iterations.hook';
import { Iteration } from '../../query/iterations/iterations.type';
import { ID } from '../../types/api';
import { Table, Td } from '../table';

import { IterationsForm } from './iterations-form';
import { IterationsOptions } from './iterations-options';

const header = ['Повтор', 'Вага', 'Час', ''];

interface Props {
    date_id: ID;
    exercise_id: ID;
}
export const IterationsItem = ({ date_id, exercise_id }: Props): JSX.Element => {
    const { data, refetch } = useIterationsQuery(date_id, exercise_id);

    return (
        <Table<Iteration>
            header={header}
            data={data ?? []}
            loadingItems={1}
            footer={<IterationsForm date_id={date_id} exercise_id={exercise_id} />}
        >
            {item => (
                <>
                    <Td w="30%">{item.repeat || '-'}</Td>
                    <Td w="30%">{item.weight || '-'}</Td>
                    <Td w="30%">{item.time || '-'}</Td>
                    <Td>
                        <IterationsOptions iteration={item} refetch={refetch} />
                    </Td>
                </>
            )}
        </Table>
    );
};
