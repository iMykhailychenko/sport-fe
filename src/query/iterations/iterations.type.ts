import { ID } from '../../types/api';

export interface IterationBody {
    time: number;
    weight: number;
    repeat: number;
    date_id: ID;
    exercise_id: ID;
}

export interface Iteration {
    id: number;
    time: number;
    weight: number;
    repeat: number;
    date_id: ID;
    exercise_id: ID;
}
