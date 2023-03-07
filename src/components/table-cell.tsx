import { TableCellProps, Td as ChakraTd, TableColumnHeaderProps, Th as ChakraTh } from '@chakra-ui/react';

export const Th = (props: TableColumnHeaderProps) => <ChakraTh py={5} px={1} {...props} />;
export const Td = (props: TableCellProps) => <ChakraTd py={5} px={1} {...props} />;
