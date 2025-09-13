"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("vitest/config");
var vite_tsconfig_paths_1 = require("vite-tsconfig-paths");
var path_1 = require("path");
exports.default = (0, config_1.defineConfig)({
    plugins: [
        (0, vite_tsconfig_paths_1.default)({
            projects: [
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
            '@index': (0, path_1.resolve)(__dirname, 'src/index.ts')
        }
    }
});
