import { memo } from 'react';

import { Button, Heading, Skeleton, Table, TableContainer, Tbody, Td, Tr, useColorMode } from '@chakra-ui/react';
import { range } from 'lodash-es';
import { BiEdit } from 'react-icons/all';
import { Link } from 'react-router-dom';

import { ExercisesType } from '../query/exercises/exercises.type';

const myRange = range(2);

interface Props {
    title?: string;
    isLoading: boolean;
    list: ExercisesType[];
}
export const ExercisesList = memo(({ title, list, isLoading }: Props): JSX.Element => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    return (
        <>
            {title && (
                <Heading mt={10} mb={5} size="md">
                    {title}
                </Heading>
            )}

            <TableContainer>
                <Table variant="simple" size="sm" borderTop="1px" borderColor={isDark ? 'gray.700' : 'gray.100'}>
                    <Tbody>
                        {isLoading ? (
                            myRange.map(index => (
                                <Tr key={index}>
                                    <Td w={6}>
                                        <Button>
                                            <BiEdit />
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Skeleton h={4} />
                                    </Td>
                                </Tr>
                            ))
                        ) : list.length ? (
                            list.map(item => (
                                <Tr key={item.id}>
                                    <Td>{item.title}</Td>
                                    <Td w={6}>
                                        <Button as={Link} to={`/new/exercises/${item.id}`}>
                                            <BiEdit />
                                        </Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td p={10} colSpan={2} display="flex" justifyContent="center">
                                    Тут пусто. Додайте нову вправу
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
});

ExercisesList.displayName = 'ExercisesList';
