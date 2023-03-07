import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useProfileQuery } from '../query/profile/profile.hook';

export const PrivateRoute = (): JSX.Element => {
    const { isLoading, isSuccess } = useProfileQuery();

    if (isLoading) {
        return <></>;
    }

    if (isSuccess) {
        return <Outlet />;
    }

    return <Navigate to="/login" />;
};

export const RestrictedRoute = (): JSX.Element => {
    const { isLoading, isSuccess } = useProfileQuery();

    if (isLoading) {
        return <></>;
    }

    if (isSuccess) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};
