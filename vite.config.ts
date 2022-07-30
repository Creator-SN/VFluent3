import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vue from '@vitejs/plugin-vue'
import path, { resolve } from "path"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/packages/index.ts'),
      name: "@creatorsn/vfluent3",
      fileName: "vfluent3",
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vue(),
    DefineOptions()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
