<script lang="ts">
	import { nord } from 'cm6-theme-nord';
	import CodeMirror from 'svelte-codemirror-editor';

	import { darkMode } from '$lib/stores/darkmode';
	import getSyntaxHightlighter from './syntaxHighlighter';

	import './style.css';

	export let source: string;
	export let language: string | undefined;
	export let lineWrapping = false;

	function getLang() {
		if (language === undefined) {
			return undefined;
		}

		return getSyntaxHightlighter(language);
	}
</script>

{#key [$darkMode, language]}
	<CodeMirror
		bind:value={source}
		theme={$darkMode ? nord : undefined}
		lang={getLang()}
		{lineWrapping}
	/>
{/key}
