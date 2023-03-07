import {
    Center,
    Stack,
    Heading,
    FormControl,
    Input,
    FormLabel,
    Button,
    HStack,
    Link as ChakraLink,
    useToast,
    FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FcUnlock } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { errorToast } from '../../../config/toast.config';
import { useLogInMutation } from '../../../query/auth/auth.hook';
import { LogInBody } from '../../../query/auth/auth.type';

export const LogInSchema = object({
    email: string().email('Не вірний формат електронної пошти').max(80, 'Дуже довга пошта').required('Це обовʼязкове поле'),
    password: string().min(4, 'Дуже короткий пароль').max(40, 'Дуже довгий пароль').required('Це обовʼязкове поле'),
});

const LogInPage = (): JSX.Element => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LogInBody>({ resolver: yupResolver(LogInSchema) });

    const navigate = useNavigate();
    const { mutate } = useLogInMutation();

    const onSubmit = (data: LogInBody): void => {
        mutate(data, {
            onSuccess: () => navigate('/'),
            onError: () => toast(errorToast),
        });
    };

    return (
        <Center as="form" action="#" h="100vh" w="100%" onSubmit={handleSubmit(onSubmit)}>
            <Stack minW="300px" spacing={6}>
                <HStack spacing={4} fontSize="40px">
                    <FcUnlock />
                    <Heading>Авторизуватись</Heading>
                </HStack>
                <FormControl isRequired isInvalid={Boolean(errors.email)}>
                    <FormLabel>Електронна пошта</FormLabel>
                    <Input type="email" placeholder="example@mail.com" {...register('email')} />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Пароль</FormLabel>
                    <Input type="password" placeholder="*****" {...register('password')} />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="blue">
                    Увійти
                </Button>

                <ChakraLink as={Link} to="/signin" textAlign="center">
                    Створити акаунт?
                </ChakraLink>
            </Stack>
        </Center>
    );
};

export default LogInPage;
