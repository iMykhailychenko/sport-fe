export interface LogInBody {
    email: string;
    password: string;
}

export interface LogInResponse {
    accessToken: string;
    tokenType: string;
}

export interface SignInBody {
    name: string;
    email: string;
    password: string;
}
