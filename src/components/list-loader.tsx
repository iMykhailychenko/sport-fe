import { Fragment } from 'react';

import { StackProps } from '@chakra-ui/layout/dist/stack/stack';
import { Stack, Skeleton } from '@chakra-ui/react';
import { range } from 'lodash-es';

type SizeType = 'sm' | 'md' | 'lg';

const sizeHeightMap = {
    sm: '30px',
    md: '40px',
    lg: '50px',
};

interface Props extends StackProps {
    count?: number;
    size?: SizeType;
}
export const ListLoader = ({ count = 4, size = 'md', ...props }: Props): JSX.Element => {
    return (
        <Stack spacing={size === 'sm' ? 2 : 3} {...props}>
            {range(count).map(item => (
                <Fragment key={item}>
                    <Skeleton h={sizeHeightMap[size]} w="100%" />
                </Fragment>
            ))}
        </Stack>
    );
};
