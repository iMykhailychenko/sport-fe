import { privateApi } from '../../api/api';

import { ProfileType } from './profile.type';

class ProfileFetcher {
    get = (): Promise<ProfileType> => {
        return privateApi.get<ProfileType>('/users/profile').then(response => response.data);
    };
}

export const profileFetcher = new ProfileFetcher();
