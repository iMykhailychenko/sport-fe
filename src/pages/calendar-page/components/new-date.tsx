import { ChangeEvent, FormEvent, useState } from 'react';

import { Button, Flex, Select, Skeleton, Heading } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import { CgMathPlus } from 'react-icons/all';

import { useDate } from '../../../context/date.context';
import { useDatesMutation } from '../../../query/dates/dates.hook';
import { DateBody } from '../../../query/dates/dates.type';
import { useTrainingsQuery } from '../../../query/trainings/trainings.hook';
import { ID } from '../../../types/api';

export const NewDate = (): JSX.Element => {
    const queryClient = useQueryClient();
    const { mutate } = useDatesMutation();
    const { data, isLoading } = useTrainingsQuery();

    const { day, month, year } = useDate();
    const param = `${day}-${month}-${year}`;

    const [training, setTraining] = useState<ID | undefined>(undefined);
    const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        setTraining(event.target.value);
    };

    const handleSubmit = (event: FormEvent): void => {
        event.preventDefault();
        if (training) {
            const body: DateBody = { value: param, trainingId: training };
            mutate(body, {
                onSuccess: () => {
                    queryClient.resetQueries(['dates', param]);
                },
            });
        }
    };

    return (
        <Flex
            as="form"
            my={4}
            mx="auto"
            maxW={340}
            action="#"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            onSubmit={handleSubmit}
        >
            <Heading mt={4} textAlign="center" size="sm">
                У вас немає тренувань на цей день
            </Heading>

            {isLoading ? (
                <Skeleton h="45px" w="100%" my={5} />
            ) : (
                <Select placeholder="Оберіть тренування зі списку" size="lg" my={5} value={training} onChange={handleChange}>
                    {data?.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.title}
                        </option>
                    ))}
                </Select>
            )}

            <Button type="submit" colorScheme="blue" disabled={!training} opacity={training ? 1 : 0.5} leftIcon={<CgMathPlus />}>
                Додати тренування в цей день
            </Button>
        </Flex>
    );
};
