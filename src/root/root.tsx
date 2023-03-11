import { lazy, Suspense } from 'react';

import { Route, Routes, Outlet } from 'react-router-dom';

import { PrivateRoute, RestrictedRoute } from '../components/redirect';
import { Layout } from '../layout';

const LoginPage = lazy(() => import('../pages/auth/login-page'));
const SigninPage = lazy(() => import('../pages/auth/signin-page'));

const HomePage = lazy(() => import('../pages/home'));
const CalendarPage = lazy(() => import('../pages/calendar-page'));
const NewItemPage = lazy(() => import('../pages/new-item-page'));

const Trainings = lazy(() => import('../pages/trainings'));
const NewTraining = lazy(() => import('../pages/trainings/new-training'));
const TodayTrainings = lazy(() => import('../pages/trainings/today-training'));
const EditTraining = lazy(() => import('../pages/trainings/edit-training'));

const Exercises = lazy(() => import('../pages/exercises'));
const NewExercise = lazy(() => import('../pages/exercises/new-exercise'));
const EditExercise = lazy(() => import('../pages/exercises/edit-exercise'));
const ExercisesItem = lazy(() => import('../pages/exercises/exercises-item'));

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
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signin" element={<SigninPage />} />
                </Route>

                <Route path="" element={<PrivateRoute />}>
                    <Route path="" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="new" element={<NewItemPage />} />
                        <Route path="calendar" element={<CalendarPage />} />

                        <Route path="trainings" element={<Trainings />} />
                        <Route path="trainings/new" element={<NewTraining />} />
                        <Route path="trainings/today" element={<TodayTrainings />} />
                        <Route path="trainings/:trainingId" element={<EditTraining />} />

                        <Route path="exercises" element={<Exercises />} />
                        <Route path="exercises/new" element={<NewExercise />} />
                        <Route path="exercises/:exerciseId" element={<ExercisesItem />} />
                        <Route path="exercises/:exerciseId/edit" element={<EditExercise />} />
                    </Route>
                </Route>

                <Route path="*" element={<Layout />}>
                    <Route path="*" element={<HomePage />} />
                </Route>
            </Route>
        </Routes>
    );
};
