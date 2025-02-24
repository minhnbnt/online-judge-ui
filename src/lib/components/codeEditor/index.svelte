<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';

	import { isDarkmodeEnabled } from '$lib/stores/darkmode';
	import getSyntaxHightlighter from './syntaxHightlighter';

	import './style.css';

	type Props = {
		source: string;
		language: string | undefined;
		lineWrapping?: boolean;
	};

	let {
		source = $bindable(),
		language = $bindable(),
		lineWrapping = false //
	}: Props = $props();

	let theme = $state<any | undefined>();
	let syntaxHighlighter = $state<any | undefined>();

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

	$effect(() => {
		refreshSyntaxHightlighter(language);
	});

	$effect(() => {
		refreshTheme($isDarkmodeEnabled);
	});
</script>

{#key [theme, syntaxHighlighter]}
	<CodeMirror bind:value={source} lang={syntaxHighlighter} {theme} {lineWrapping} />
{/key}
