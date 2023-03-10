import React from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreateTrainingsMutation } from '../../query/trainings/trainings.hook';
import { TrainingsBody } from '../../query/trainings/trainings.type';

import { TrainingForm } from './components/training-form';

const NewTraining = (): JSX.Element => {
    const navigate = useNavigate();
    const { mutateAsync } = useCreateTrainingsMutation();

    const onSubmit = async (data: TrainingsBody): Promise<void> => {
        await mutateAsync(data);
        await navigate('/trainings');
    };

    return <TrainingForm onSubmit={onSubmit} buttonLabel="Створити програму" />;
};

export default NewTraining;
