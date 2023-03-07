import { useMutation, UseMutationResult } from '@tanstack/react-query';

import { removeToken, setToken } from '../../api/api';

import { logInFetcher, signInFetcher } from './auth.fetcher';
import { LogInResponse, LogInBody, SignInBody } from './auth.type';

export const useLogInMutation = (): UseMutationResult<LogInResponse, unknown, LogInBody> => {
    return useMutation({
        mutationKey: ['auth', 'log-in'],
        mutationFn: logInFetcher,
        onSuccess: setToken,
        onError: removeToken,
    });
};

export const useSignInMutation = (): UseMutationResult<void, unknown, SignInBody> => {
    return useMutation({
        mutationKey: ['auth', 'sign-in'],
        mutationFn: signInFetcher,
        onError: removeToken,
    });
};
