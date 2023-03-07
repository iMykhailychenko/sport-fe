import { ID } from '../../types/api';

export interface ExercisesType {
    id: ID;
    title: string;
    description: string;
    image?: string;
}

export interface ExercisesBody {
    title: string;
    description?: string;
    image?: string;
}
