import { ID } from '../../types/api';
import { ExercisesType } from '../exercises/exercises.type';

export interface DateType extends ExercisesType {
    date: string;
    exercise_id: number;
    comment?: string;
}

export interface DateExerciseBody {
    date: string;
    exercise_id: ID;
    comment?: string;
}

export interface DateTrainingBody {
    date: string;
    training_id: ID;
    comment?: string;
}
