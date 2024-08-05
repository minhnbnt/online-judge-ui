<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
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

{#key language}
	<CodeMirror bind:value={source} lang={getLang()} {lineWrapping} />
{/key}
