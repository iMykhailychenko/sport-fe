import { UseToastOptions } from '@chakra-ui/react';

export const errorToast: UseToastOptions = {
    title: 'Виникла помилка',
    description: 'Технічна помилка. Спробуйте повторити пізніше',
    status: 'error',
    duration: 5_000,
    isClosable: true,
};

export const successToast: UseToastOptions = {
    title: 'Ураа',
    description: 'Успіх',
    status: 'success',
    duration: 5_000,
    isClosable: true,
};
