import { lazy, Suspense } from 'react';

import { Route, Routes, Outlet } from 'react-router-dom';

import { PrivateRoute, RestrictedRoute } from '../components/redirect';
import { Layout } from '../layout/layout';

const LogInPage = lazy(() => import('../pages/auth-page/log-in-page/log-in-page'));
const SignInPage = lazy(() => import('../pages/auth-page/sign-in-page/sign-in-page'));

const HomePage = lazy(() => import('../pages/home-page/home-page'));
const CalendarPage = lazy(() => import('../pages/calendar-page/calendar-page'));
const TrainingPage = lazy(() => import('../pages/trainings-page/trainings-page'));
const TrainingsAllPage = lazy(() => import('../pages/trainings-page/trainings-all-page/trainings-all-page'));
const NewItemPage = lazy(() => import('../pages/new-item-page/new-item-page'));
const NewExercisesPage = lazy(() => import('../pages/new-item-page/new-exercises-page/new-exercises-page'));
const NewTrainingsPage = lazy(() => import('../pages/new-item-page/new-trainings-page/new-trainings-page'));

const LazyComponent = (): JSX.Element => (
    <Suspense fallback={null}>
        <Outlet />
    </Suspense>
);

export const Root = (): JSX.Element => {
    return (
        <Routes>
            <Route path="" element={<LazyComponent />}>
                <Route path="" element={<RestrictedRoute />}>
                    <Route path="login" element={<LogInPage />} />
                    <Route path="signin" element={<SignInPage />} />
                </Route>

                <Route path="" element={<PrivateRoute />}>
                    <Route path="" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="calendar" element={<CalendarPage />} />
                        <Route path="trainings" element={<TrainingPage />} />
                        <Route path="trainings/all" element={<TrainingsAllPage />} />

                        <Route path="new" element={<NewItemPage />} />
                        <Route path="new/exercises" element={<NewExercisesPage />} />
                        <Route path="new/trainings" element={<NewTrainingsPage />} />
                    </Route>
                </Route>

                <Route path="*" element={<Layout />}>
                    <Route path="*" element={<HomePage />} />
                </Route>
            </Route>
        </Routes>
    );
};
