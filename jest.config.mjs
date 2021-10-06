export default {
    clearMocks: true,
    // restoreMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageReporters: [
        'text',
        'lcov',
    ],
    testEnvironment: 'node',
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
    watchPathIgnorePatterns: [
        'node_modules',
    ],
    transformIgnorePatterns: ['node_modules'],
    collectCoverageFrom: [
        './**/*.js', '!./app.js', '!./database/migrations/*js', '!./database/seeders/*.js',
        '!./bin/*.js', '!./configs/*.js', '!./routes/*.js', '!./database/models/*.js', '!./coverage/**/*.js',
        '!./middlewares/multerMiddleware.js',
    ],
};
