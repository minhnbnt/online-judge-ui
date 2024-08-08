<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';

	import { darkMode } from '$lib/stores/darkmode';
	import getSyntaxHightlighter from './syntaxHighlighter';

	import './style.css';

	export let source: string;
	export let language: string | undefined;
	export let lineWrapping = false;

	let theme: any = undefined;

	async function setTheme(isDark: boolean) {
		if (!isDark) {
			theme = undefined;
			return;
		}

		const { nord } = await import('cm6-theme-nord');
		theme = nord;
	}

	function getLang(): any {
		if (language === undefined) {
			return undefined;
		}

		return getSyntaxHightlighter(language);
	}

	$: setTheme($darkMode);
</script>

{#key [theme, language]}
	<CodeMirror bind:value={source} lang={getLang()} {theme} {lineWrapping} />
{/key}
