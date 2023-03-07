import { ID } from '../../types/api';

export interface TrainingsType {
    id: ID;
    title: string;
}

export interface TrainingsBody {
    title: string;
    exercises: ID[];
}
