import React from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useTrainingsCreateMutation } from '../../query/trainings/trainings.hook';
import { TrainingsBody } from '../../query/trainings/trainings.type';

import { TrainingForm } from './components/training-form';

const NewTraining = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
    const { mutateAsync } = useTrainingsCreateMutation();

    const onSubmit = async (data: TrainingsBody): Promise<void> => {
        await mutateAsync(data);
        await navigate('/trainings', { state: { from: location } });
    };

    return <TrainingForm onSubmit={onSubmit} buttonLabel="Створити програму" />;
};

export default NewTraining;
