import { ID } from '../../types/api';

export interface DateBody {
    value: string;
    training_id: ID;
    comment?: string;
}

export interface DateType {
    id: ID;
    value: string;
    training_id: ID;
    comment?: string;
}
