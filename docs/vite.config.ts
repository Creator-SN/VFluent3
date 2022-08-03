import { defineConfig } from 'vite'
import DefineOptions from 'unplugin-vue-define-options/vite'
// import {fileURLToPath} from 'url';
import path from "path"

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: [DefineOptions()
  ],
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
})

