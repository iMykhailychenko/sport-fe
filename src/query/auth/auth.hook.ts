import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { removeToken, setToken } from '../../api/api';

import { authFetcher } from './auth.fetcher';
import { LogInResponse, LogInBody, SignInBody } from './auth.type';

export const useLogInMutation = (): UseMutationResult<LogInResponse, unknown, LogInBody> => {
    return useMutation({
        mutationKey: ['auth', 'login'],
        mutationFn: authFetcher.login,
        onSuccess: setToken,
        onError: removeToken,
    });
};

export const useSignInMutation = (): UseMutationResult<void, unknown, SignInBody> => {
    return useMutation({
        mutationKey: ['auth', 'signin'],
        mutationFn: authFetcher.signin,
        onError: removeToken,
    });
};
