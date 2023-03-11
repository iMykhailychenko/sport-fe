import React, { ReactNode, Fragment } from 'react';

import {
    TableContainer,
    Table as ChakraTable,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th as ChakraTh,
    Td as ChakraTd,
    TableColumnHeaderProps,
    TableCellProps,
    Skeleton,
} from '@chakra-ui/react';
import { range } from 'lodash-es';

import { ID } from '../types/api';

export const Th = (props: TableColumnHeaderProps): JSX.Element => <ChakraTh px={1} {...props} />;
export const Td = (props: TableCellProps): JSX.Element => <ChakraTd px={1} {...props} />;

interface Props<T extends { id: ID }> {
    data: T[];
    header?: string[];
    isLoading?: boolean;
    footer?: ReactNode;
    loadingItems?: number;
    children: (item: T, index: number) => ReactNode;
}
export function Table<T extends { id: ID }>({
    header,
    data,
    footer,
    children,
    isLoading = false,
    loadingItems = 4,
}: Props<T>): JSX.Element {
    return (
        <TableContainer>
            <ChakraTable variant="simple" size="sm">
                {header && (
                    <Thead>
                        <Tr>
                            {header.map((item, index) => (
                                <Th key={index}>{item}</Th>
                            ))}
                        </Tr>
                    </Thead>
                )}
                <Tbody>
                    {isLoading
                        ? range(loadingItems).map(item => (
                              <Tr key={item}>
                                  {(header ?? [1]).map((_, inner) => (
                                      <Td key={`${item}-${inner}`}>
                                          <Skeleton h="40px" w="100%" />
                                      </Td>
                                  ))}
                              </Tr>
                          ))
                        : data.map((item, index) => <Fragment key={item.id}>{children(item, index)}</Fragment>)}
                </Tbody>

                {footer && (
                    <Tfoot>
                        <Tr>{footer}</Tr>
                    </Tfoot>
                )}
            </ChakraTable>
        </TableContainer>
    );
}
