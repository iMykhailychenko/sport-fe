import { memo } from 'react';

import { ID } from '../../../types/api';

interface Props {
    exerciseId: ID;
    trainingId: ID;
}
export const Iterations = memo(({ exerciseId, trainingId }: Props): JSX.Element => {
    console.log(exerciseId, trainingId);
    return <></>;
});

Iterations.displayName = 'Iterations';
