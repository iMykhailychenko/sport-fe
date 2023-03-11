import React, { ReactNode } from 'react';

import { Button, Center, useColorMode } from '@chakra-ui/react';

interface Props {
    children: ReactNode;
}
export const FloatingButton = ({ children }: Props): JSX.Element => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    return (
        <Center
            p={4}
            w="100%"
            left={0}
            bottom={20}
            position="fixed"
            borderTop="1px"
            zIndex={10}
            bg={isDark ? 'gray.800' : 'white'}
            borderColor={isDark ? 'gray.600' : 'gray.200'}
        >
            <Button type="submit" colorScheme="blue">
                {children}
            </Button>
        </Center>
    );
};
