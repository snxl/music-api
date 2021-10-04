module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
        },
    },
    rules: {
        'max-len': ['error', { code: 130 }],
        'no-console': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        indent: [
            'error',
            4,
        ],
        'linebreak-style': [
            'error',
            'unix',
        ],
        quotes: [
            'error', 'single', { allowTemplateLiterals: true },
        ],
        semi: [
            'error',
            'always',
        ],
        'class-methods-use-this': 'off',
        'no-useless-constructor': 'off',
        'no-empty-function': 'off',
        'no-restricted-syntax': 'off',
        'guard-for-in': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'off',
        'import/no-unresolved': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-param-reassign': 'off',
        'consistent-return': 'off',
        'no-return-await': 'off',
        'prefer-rest-params': 'off',
    },

    ignorePatterns: '**/*.test.js',

};
