import { ReactNode } from 'react';

import { Button, Heading, Skeleton, TableContainer, Table, Tbody, Tr, Td, useColorMode } from '@chakra-ui/react';
import { range } from 'lodash-es';
import { Link } from 'react-router-dom';

import { ExercisesType } from '../../../../query/exercises/exercises.type';

const range4 = range(4);

interface Props {
    title: string;
    isLoading: boolean;
    list: ExercisesType[];
    onSelect: (item: ExercisesType) => void;
    icon: ReactNode;
    input?: ReactNode;
}
export const ExercisesList = ({ title, list, isLoading, onSelect, icon, input }: Props): JSX.Element => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    return (
        <>
            <Heading mt={10} mb={5} size="md">
                {title}
            </Heading>

            {input}

            <TableContainer>
                <Table variant="simple" size="sm" borderTop="1px" borderColor={isDark ? 'gray.700' : 'gray.100'}>
                    <Tbody>
                        {isLoading ? (
                            range4.map(index => (
                                <Tr key={index}>
                                    <Td w={4}>
                                        <Button>{icon}</Button>
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
                                    <Td w={4}>
                                        <Button onClick={() => onSelect(item)}>{icon}</Button>
                                    </Td>
                                </Tr>
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={2} display="flex" justifyContent="center">
                                    <Button as={Link} to="/new/exercises">
                                        Створити нову вправу
                                    </Button>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};
