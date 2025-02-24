import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	define: {
		__ENABLE_CARTA_SSR_HIGHLIGHTER__: false
	},
	optimizeDeps: {
		exclude: [
			'codemirror',
			'svelte-codemirror-editor',
			'cm6-theme-nord',
			'@codemirror/language',
			'@codemirror/lang-cpp',
			'@codemirror/lang-java',
			'@codemirror/lang-python',
			'@codemirror/lang-markdown',
			'@codemirror/lang-rust',
			'@codemirror/lang-go',
			'@replit/codemirror-lang-csharp'
		]
	}
});
