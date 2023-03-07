import { publicApi } from '../../api/api';

import { LogInBody, LogInResponse, SignInBody } from './auth.type';

export const logInFetcher = (body: LogInBody): Promise<LogInResponse> => {
    return publicApi.post<LogInResponse>('/users/login', body).then(response => response.data);
};

export const signInFetcher = async (body: SignInBody): Promise<void> => {
    await publicApi.post<void>('/users/create', body);
};
