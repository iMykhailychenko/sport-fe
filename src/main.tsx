import React from 'react';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { DateProvider } from './context/date.context';
import { Root } from './root/root';
import theme from './utils/theme';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
            <DateProvider>
                <BrowserRouter>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Root />
                </BrowserRouter>
            </DateProvider>
        </QueryClientProvider>
    </ChakraProvider>,
);
