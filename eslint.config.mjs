import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';
const require = createRequire(import.meta.url);
const vitals = (await import(pathToFileURL(require.resolve('eslint-config-next/core-web-vitals')).href)).default;
const typescript = (await import(pathToFileURL(require.resolve('eslint-config-next/typescript')).href)).default;
// Support both the installed legacy config and current Next.js flat configs.
const rules = Array.isArray(vitals) && Array.isArray(typescript)
  ? [...vitals, ...typescript]
  : new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) }).extends('next/core-web-vitals', 'next/typescript');
export default [...rules, { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] }];
