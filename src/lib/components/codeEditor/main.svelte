<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';

	import { darkMode } from '$lib/stores/darkmode';
	import getSyntaxHightlighter from './syntaxHighlighter';

	import './style.css';

	export let source: string;
	export let language: string | undefined;
	export let lineWrapping = false;

	let theme: any = undefined;
	let syntaxHighlighter: any = undefined;

	async function refreshTheme(isDark: boolean) {
		if (!isDark) {
			theme = undefined;
			return;
		}

		const { nord } = await import('cm6-theme-nord');
		theme = nord;
	}

	async function refreshSyntaxHightlighter(language: string | undefined) {
		if (language === undefined) {
			syntaxHighlighter = undefined;
			return;
		}

		syntaxHighlighter = await getSyntaxHightlighter(language);
	}

	$: refreshSyntaxHightlighter(language);
	$: refreshTheme($darkMode);
</script>

{#key [theme, syntaxHighlighter]}
	<CodeMirror bind:value={source} lang={syntaxHighlighter} {theme} {lineWrapping} />
{/key}
