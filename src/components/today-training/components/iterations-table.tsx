import { memo } from 'react';

import {
    IconButton,
    Skeleton,
    TableContainer,
    Table,
    Tbody,
    Thead,
    Tr,
    Td as ChakraTd,
    Th as ChakraTh,
    TableColumnHeaderProps,
    TableCellProps,
} from '@chakra-ui/react';
import { range } from 'lodash-es';
import { BiEdit } from 'react-icons/all';

import { Iteration } from '../../../query/iterations/iterations.type';

const range4 = range(4);

const Th = (props: TableColumnHeaderProps): JSX.Element => <ChakraTh {...props} px={1} w="calc(100% / 4)" />;
const Td = (props: TableCellProps): JSX.Element => <ChakraTd {...props} px={1} w="calc(100% / 4)" />;

interface Props {
    data?: Iteration[];
    isLoading: boolean;
}

export const IterationsTable = memo(({ isLoading, data }: Props): JSX.Element => {
    return (
        <TableContainer>
            <Table variant="simple" mb={4} size="sm">
                <Thead>
                    <Tr>
                        <Th>Повтор</Th>
                        <Th>Вага</Th>
                        <Th>Час</Th>
                        <Th />
                    </Tr>
                </Thead>

                <Tbody>
                    {isLoading ? (
                        <Tr>
                            {range4.map(index => (
                                <Td key={index}>
                                    <Skeleton w="100%" h={6} />
                                </Td>
                            ))}
                        </Tr>
                    ) : (
                        data?.map(item => (
                            <Tr key={item.id}>
                                <Td>{item.repeat}</Td>
                                <Td>{item.weight}</Td>
                                <Td>{item.time}</Td>
                                <Td>
                                    <IconButton aria-label="Редагувати підхід" w="100%">
                                        <BiEdit />
                                    </IconButton>
                                </Td>
                            </Tr>
                        ))
                    )}
                </Tbody>
            </Table>
        </TableContainer>
    );
});

IterationsTable.displayName = 'IterationsTable';
