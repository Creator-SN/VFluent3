import { defineConfig } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import path from 'path';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
            ],
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    plugins: [DefineOptions()],
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
});
