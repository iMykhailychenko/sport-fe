import { useColorMode, Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { NavLink as RouterLink, NavLinkProps } from 'react-router-dom';

export const NavLink = (props: LinkProps & NavLinkProps): JSX.Element => {
    const { colorMode } = useColorMode();
    const isDark = colorMode === 'dark';

    return (
        <ChakraLink
            as={RouterLink}
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={isDark ? 'gray.700' : 'white'}
            fontSize="22px"
            {...props}
            sx={{
                '&.active': {
                    bg: isDark ? 'gray.600' : 'gray.50',
                    color: 'blue.400',
                },
            }}
        />
    );
};
