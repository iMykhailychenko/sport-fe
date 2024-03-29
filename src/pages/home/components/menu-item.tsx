import { Button, HStack, Text } from '@chakra-ui/react';
import { NavLink, useLocation } from 'react-router-dom';

interface Props {
    to: string;
    label: string;
    children: JSX.Element[] | JSX.Element;
}
export const MenuItem = ({ to, label, children }: Props): JSX.Element => {
    const location = useLocation();
    return (
        <Button
            py={4}
            h="auto"
            to={to}
            w="100%"
            as={NavLink}
            display="flex"
            justifyContent="flex-start"
            state={{ from: location }}
            sx={{ '&.active': { bg: 'blue.800', color: 'white' } }}
        >
            <HStack spacing={5} sx={{ svg: { fontSize: '30px' } }}>
                {children}
                <Text>{label}</Text>
            </HStack>
        </Button>
    );
};
