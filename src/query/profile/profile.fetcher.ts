import { privateApi } from '../../api/api';

import { ProfileType } from './profile.type';

export const profileFetcher = (): Promise<ProfileType> => {
    return privateApi.get<ProfileType>('/users/profile').then(response => response.data);
};
