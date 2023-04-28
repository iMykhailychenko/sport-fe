import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { refreshToken, removeToken } from '../../api/api';

import { profileFetcher } from './profile.fetcher';
import { ProfileType } from './profile.type';

export const useProfileQuery = (): UseQueryResult<ProfileType> => {
    const isTokenPresent = refreshToken();

    const data = useQuery<ProfileType>({
        queryKey: ['profile'],
        queryFn: profileFetcher.get,
        onError: removeToken,
        enabled: isTokenPresent,
    });

    if (isTokenPresent) {
        return data;
    } else {
        return { isLoading: false, isSuccess: false } as UseQueryResult<ProfileType>;
    }
};
