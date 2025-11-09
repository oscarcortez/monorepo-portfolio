import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // 1️⃣ Base Next.js + TypeScript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 2️⃣ Prettier integration (solo formato)
  eslintPluginPrettierRecommended,

  // 4️⃣ React Hooks plugin y tus reglas personalizadas
  {
    plugins: { 'react-hooks': reactHooks },
    rules: {
      // Variables y código limpio
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-var': 'error',
      'prefer-const': 'warn',

      // Bloquear console.log
      'no-console': ['error', { allow: ['warn', 'error'] }],

      // React/JSX
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Accesibilidad
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',

      // Orden de imports
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],

      // Prettier como regla
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  {
    ignores: ['src/app/graphql/generated/**'],
  },
];
