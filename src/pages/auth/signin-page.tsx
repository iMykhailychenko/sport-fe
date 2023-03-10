import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    useToast,
    Link as ChakraLink,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { FcTwoSmartphones } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

import { errorToast } from '../../config/toast.config';
import { useLogInMutation, useSignInMutation } from '../../query/auth/auth.hook';
import { SignInBody } from '../../query/auth/auth.type';

export const SignInSchema = object({
    name: string().min(1, 'Дуже коротке імʼя').max(80, 'Дуже довге імʼя').required('Це обовʼязкове поле'),
    email: string().email('Не вірний формат електронної пошти').max(80, 'Дуже довга пошта').required('Це обовʼязкове поле'),
    password: string().min(4, 'Дуже короткий пароль').max(40, 'Дуже довгий пароль').required('Це обовʼязкове поле'),
});

const SigninPage = (): JSX.Element => {
    const toast = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInBody>({ resolver: yupResolver(SignInSchema) });

    const navigate = useNavigate();
    const { mutate: logInMutation } = useLogInMutation();
    const { mutate: signInMutation } = useSignInMutation();

    const onSubmit = (data: SignInBody): void => {
        signInMutation(data, {
            onError: () => toast(errorToast),
            onSuccess: (_, variables) => {
                logInMutation(variables, {
                    onSuccess: () => navigate('/'),
                    onError: () => toast(errorToast),
                });
            },
        });
    };

    return (
        <Center as="form" action="#" h="100vh" w="100%" onSubmit={handleSubmit(onSubmit)}>
            <Stack minW="300px" spacing={6}>
                <HStack spacing={4} fontSize="40px">
                    <FcTwoSmartphones />
                    <Heading>Зареєструватись</Heading>
                </HStack>

                <FormControl isRequired isInvalid={Boolean(errors.name)}>
                    <FormLabel>Ваше імʼя</FormLabel>
                    <Input type="name" placeholder="Іван" {...register('name')} />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={Boolean(errors.email)}>
                    <FormLabel>Електронна пошта</FormLabel>
                    <Input type="email" placeholder="example@mail.com" {...register('email')} />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={Boolean(errors.password)}>
                    <FormLabel>Пароль</FormLabel>
                    <Input type="password" placeholder="*****" {...register('password')} />
                    <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" colorScheme="blue">
                    Зареєструватись
                </Button>

                <ChakraLink as={Link} to="/login" textAlign="center">
                    Вже маєте акаунт?
                </ChakraLink>
            </Stack>
        </Center>
    );
};

export default SigninPage;
