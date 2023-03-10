import { useDateQuery } from '../../query/dates/dates.hook';
import { Accordion } from '../accordion';

import { IterationsItem } from './iterations-item';

export const IterationsList = (): JSX.Element => {
    const { data, isLoading } = useDateQuery();

    return (
        <Accordion isLoading={isLoading} data={data ?? []} header={item => item.title}>
            {item => <IterationsItem date_id={item.id} exercise_id={item.exercise_id} />}
        </Accordion>
    );
};
