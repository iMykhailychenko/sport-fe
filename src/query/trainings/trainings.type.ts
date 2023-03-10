import { ID } from '../../types/api';

export interface TrainingsType {
    id: ID;
    title: string;
}

export interface UpdateTrainingsType {
    id: ID;
    title: string;
    exercises: ID[];
}

export interface TrainingsBody {
    title: string;
    exercises: ID[];
}
