import { publicApi } from '../../api/api';

import { LogInBody, LogInResponse, SignInBody } from './auth.type';

class AuthFetcher {
    login = (body: LogInBody): Promise<LogInResponse> => {
        return publicApi.post<LogInResponse>('/users/login', body).then(response => response.data);
    };

    signin = async (body: SignInBody): Promise<void> => {
        await publicApi.post<void>('/users/create', body);
    };
}

export const authFetcher = new AuthFetcher();
