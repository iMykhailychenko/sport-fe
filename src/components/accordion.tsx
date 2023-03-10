import React, { ReactNode } from 'react';

import {
    Box,
    Heading,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    Accordion as ChakraAccordion,
    useColorMode,
} from '@chakra-ui/react';

import { ID } from '../types/api';

import { ListLoader } from './list-loader';

interface Props<T extends { id: ID }> {
    data: T[];
    isLoading?: boolean;
    header: (item: T) => ReactNode;
    children: (item: T) => ReactNode;
}
export function Accordion<T extends { id: ID }>({ isLoading, header, children, data }: Props<T>): JSX.Element {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    if (isLoading) {
        return <ListLoader count={10} size="lg" />;
    }

    const bg = isDark ? 'gray.700' : 'gray.100';
    const bgActive = isDark ? 'gray.600' : 'gray.300';

    return (
        <ChakraAccordion allowMultiple>
            {data.map(item => (
                <AccordionItem key={item.id}>
                    {({ isExpanded }) => (
                        <>
                            <Heading>
                                <AccordionButton
                                    p={5}
                                    bg={bg}
                                    _hover={{ bg: bg }}
                                    _focus={{ bg: bgActive }}
                                    _expanded={{ bg: bgActive }}
                                >
                                    <Box as="span" flex="1" textAlign="left">
                                        {header(item)}
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </Heading>

                            <AccordionPanel px={0} pb={0}>
                                {isExpanded && children(item)}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            ))}
        </ChakraAccordion>
    );
}
