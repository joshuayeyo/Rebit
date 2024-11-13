import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTest.ts',
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: [
            {
                find: '@',
                replacement: '/src',
            },
        ],
    },
});
