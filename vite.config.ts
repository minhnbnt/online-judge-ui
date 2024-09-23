import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler' // or "modern"
			}
		}
	},

	plugins: [sveltekit()],
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
