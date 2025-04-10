import eslintConfigSnordianH5P from 'eslint-config-snordian-h5p';
import pluginReact from 'eslint-plugin-react';

export default [
  eslintConfigSnordianH5P.configs['flat/recommended'],
  {
    name: 'react-config',
    ignores: ['dist/**/*'],
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/prop-types': 'warn',
      'brace-style': ['off', '1tbs'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // Activate support for JSX
        },
      },
    },
  },
];
