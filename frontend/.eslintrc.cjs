module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        'jest/globals': true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'airbnb',
        'airbnb/hooks',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', 'jest', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'react/forbid-prop-types': 0,
        'no-console': 0,
        'no-alert': 0,
        'react/prop-types': 0,
        'react/jsx-props-no-spreading': 0,
        'import/no-extraneous-dependencies': 0
    },
};
