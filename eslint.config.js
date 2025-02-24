import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';

import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],

		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		rules: { '@typescript-eslint/no-explicit-any': 'off' }
	}
);
