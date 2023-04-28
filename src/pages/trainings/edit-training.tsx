import React, { useMemo } from 'react';

import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { ListLoader } from '../../components/list-loader';
import { useTrainingExercisesQuery, useTrainingQuery, useTrainingsUpdateAllMutation } from '../../query/trainings/trainings.hook';
import { TrainingsBody } from '../../query/trainings/trainings.type';

import { TrainingForm } from './components/training-form';

const EditTraining = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    const params = useParams();
    const trainingId = Number(params.trainingId);

    const { mutateAsync } = useTrainingsUpdateAllMutation();

    const { data: training, isLoading: isTrainingLoading } = useTrainingQuery(trainingId);
    const { data: exercises, isLoading: isExercisesLoading } = useTrainingExercisesQuery(trainingId);

    const selected = useMemo(() => exercises?.map(item => item.id) ?? [], [exercises]);

    const onSubmit = async (data: TrainingsBody): Promise<void> => {
        await mutateAsync({ ...data, id: trainingId });
        await navigate('/trainings', { state: { from: location } });
    };

    return isTrainingLoading || isExercisesLoading ? (
        <ListLoader />
    ) : (
        <TrainingForm defaultValues={training} selected={selected} onSubmit={onSubmit} buttonLabel="Зберегти зміни" />
    );
};

export default EditTraining;
