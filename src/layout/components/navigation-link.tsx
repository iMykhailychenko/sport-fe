import { useColorMode, Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import { NavLink as RouterLink, NavLinkProps, useLocation } from 'react-router-dom';

export const NavigationLink = (props: LinkProps & NavLinkProps): JSX.Element => {
    const location = useLocation();
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
            state={{ from: location }}
            sx={{
                '&.active': {
                    bg: isDark ? 'gray.600' : 'gray.50',
                    color: 'blue.400',
                },
            }}
        />
    );
};
