import { ID } from '../../types/api';

export interface DateBody {
    value: string;
    trainingId: ID;
    comment?: string;
}

export interface DateType {
    id: ID;
    value: string;
    trainingId: ID;
    comment?: string;
}
