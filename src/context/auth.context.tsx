import { createContext, ReactNode } from 'react';

export interface AuthType {
    status: 'INIT';
}

export const AuthContext = createContext<AuthType>({} as AuthType);

export const AuthProvider = ({ children }: Record<'children', ReactNode>): JSX.Element => {
    // const
    return <AuthContext.Provider value={{} as AuthType}>{children}</AuthContext.Provider>;
};
