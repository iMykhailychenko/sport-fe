import { ID } from '../../types/api';

export interface ProfileType {
    id: ID;
    name: string;
    avatar?: string;
    email: string;
}
