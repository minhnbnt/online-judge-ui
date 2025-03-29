<script>
	import { twMerge } from 'tailwind-merge';

	import CodeEditor from '$lib/components/codeEditor/index.svelte';
	import { languages } from '$lib/utils/languages';

	let { data } = $props();
	const { source, owner, judgeResult, language, version, submittedOn } = data;

	const summittedOnParsed = new Date(submittedOn);
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

	const containerClassName = twMerge(
		'rounded-lg border bg-white shadow',
		'dark:border-gray-500 dark:bg-gray-800 dark:bg-none dark:text-white'
	);

	let inEditorSource = $state(source);
</script>

<div class="m-10 space-y-5">
	<div class={twMerge(containerClassName, 'w-fit p-2 px-3')}>
		<p>Submittor: {owner}</p>
		<p>Submitted on: {summittedOnParsed.toLocaleString()}</p>

		<p>Result: <span class={getResultColorClass()}>{judgeResult}</span></p>
		<p>Language: {languageSubmitted.name} - {version}</p>
	</div>

	<div class={twMerge(containerClassName, 'flex h-[500px] overflow-hidden')}>
		<CodeEditor bind:source={inEditorSource} {language} />
	</div>
</div>
