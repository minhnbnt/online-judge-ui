<script>
	import CodeEditor from '$lib/components/codeEditor/main.svelte';
	import { languages } from '$lib/utils/languages';

	export let data;
	console.log(data);

	let { source, owner, judgeResult, language, version, summittedOn } = data;

	const summittedOnParsed = new Date(summittedOn);

	const languageSubmitted = languages.filter(({ compiler }) => language === compiler)[0];

	function getResultColorClass() {
		if (judgeResult === 'AC') {
			return 'text-green-600';
		}

		if (judgeResult === 'CE') {
			return 'text-gray-600';
		}

		return 'text-red-600';
	}
</script>

<div class="m-10 space-y-5">
	<div class="container w-fit p-2 px-3">
		<p>Submittor: {owner}</p>
		<p>Submitted on: {summittedOnParsed.toString()}</p>

		<p>Result: <span class={getResultColorClass()}>{judgeResult}</span></p>
		<p>Language: {languageSubmitted.name} - {version}</p>
	</div>

	<div class="container flex h-[500px] overflow-hidden">
		<CodeEditor bind:source {language} />
	</div>
</div>

<style>
	.container {
		@apply rounded-lg border bg-white shadow;
	}
</style>
