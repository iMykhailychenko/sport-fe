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

export interface ExerciseIterations extends Omit<Iteration, 'date_id'> {
    date: string;
}

export interface UpdateIterationBody {
    id: number;
    time?: number;
    weight?: number;
    repeat?: number;
}
