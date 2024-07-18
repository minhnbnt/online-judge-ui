<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { python } from '@codemirror/lang-python';
	import './style.css';

	export let source: string;
</script>

<CodeMirror bind:value={source} lang={python()} />
