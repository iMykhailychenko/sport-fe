import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            devOptions: {
                enabled: true,
            },
        }),
    ],
    server: {
        hmr: {},
    },
    build: {
        outDir: 'build',
        commonjsOptions: {
            esmExternals: true,
        },
    },
});
