import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

const path = require("path");

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            "@": path.resolve(__dirname, "./src"),
        },
    },
})