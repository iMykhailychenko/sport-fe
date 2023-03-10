import { IterationBody } from '../../query/iterations/iterations.type';

export type IterationForm = Pick<IterationBody, 'repeat' | 'weight' | 'time'>;
