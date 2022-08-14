import { defineConfig } from 'vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
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
    build: {
        lib: {
            entry: resolve(__dirname, 'src/packages/index.ts'),
            name: '@creatorsn/vfluent3',
            fileName: 'vfluent3',
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    plugins: [vue(), DefineOptions()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
