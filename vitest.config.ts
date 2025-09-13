import { defineConfig } from 'vitest/config'
import  tsconfigPath from "vite-tsconfig-paths";
import { resolve } from 'path'

export default defineConfig({
    plugins:[
        tsconfigPath({
            projects:[
                "./tsconfig.test.json"
            ]
        })
    ],
    test: {
        globals: true,
        include: ['src/**/*.test.ts'],
        environment: 'node',
        coverage: {
            provider: 'v8',
            all: true,
            include: ['src/**/*.ts'],
            exclude: [
                'src/**/*.test.ts',
                'node_modules/',
                'dist/'
            ],
            reporter: ['text', 'html', 'lcov']
        }
    },
    resolve: {
        alias: {
            '@index': resolve(__dirname, 'src/index.ts')
        }
    }
})
