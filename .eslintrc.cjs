module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', 'react-portfolio'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: ['react', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
