const { pathsToModuleNameMapper } = require('ts-jest');
const { join } = require('path')
const { compilerOptions } = require('./tsconfig.json');


/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    rootDir: __dirname,
    preset: 'ts-jest',
    testEnvironment: 'node',

    collectCoverage: true,
    coverageThreshold: {
        global: {
            lines: 40
        }
    },

    modulePaths: ["<rootDir>/"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: join('<rootDir>', compilerOptions.baseUrl)
    }),
};