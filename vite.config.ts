import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: [
			'codemirror',
			'svelte-codemirror-editor',
			'@codemirror/autocomplete',
			'@codemirror/lang-cpp',
			"@codemirror/lang-java",
			'@codemirror/lang-python',
			"@codemirror/lang-rust",
			"@codemirror/lang-go",
		]
	}
});
