import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser'; // TypeScript 파서
import tseslint from '@typescript-eslint/eslint-plugin'; // TypeScript ESLint 플러그인
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier'; // Prettier 설정

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    parser: tsParser, // TypeScript 파서 지정
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:prettier/recommended', // Prettier 설정 추가
    ],
    files: ['**/*.{js,jsx,ts,tsx}'], // JavaScript 및 TypeScript 파일 포함
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: [
      '@typescript-eslint', // TypeScript ESLint 플러그인
      'react-hooks',
      'react-refresh',
      'prettier', // Prettier 플러그인 추가
    ],
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error', // Prettier 포맷팅 오류를 ESLint 오류로 표시
    },
  }
);
