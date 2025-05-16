<script>
	import { twMerge } from 'tailwind-merge';

	import CodeEditor from '$lib/components/codeEditor/index.svelte';
	import { languages } from '$lib/utils/languages';
	import gotoUserProfile from '$lib/utils/gotoUserProfile.js';

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

	const tdClassName = 'pb-1 px-3 pt-2 border-r';

	let inEditorSource = $state(source);
</script>

<div class="m-10 space-y-5">
	<div class={twMerge(containerClassName, 'w-fit')}>
		<table class="table-fixed px-10 dark:border-gray-500 dark:bg-gray-900 dark:text-white">
			<tbody class="last:border-none [&>tr]:border-b">
				<tr>
					<td class={tdClassName}>Submittor</td>
					<td
						class={twMerge(tdClassName, 'cursor-pointer')}
						onclick={() => gotoUserProfile(owner.id)}>{owner.username}</td
					>
				</tr>

				<tr>
					<td class={tdClassName}>Submitted on</td>
					<td class={tdClassName}>{summittedOnParsed.toLocaleString()}</td>
				</tr>
				<tr>
					<td class={tdClassName}>Judge Result</td>
					<td class={twMerge(tdClassName, getResultColorClass())}>{judgeResult}</td>
				</tr>
				<tr>
					<td class={tdClassName}>Language</td>
					<td class={tdClassName}>{languageSubmitted.name} - {version}</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class={twMerge(containerClassName, 'flex h-[500px] overflow-hidden')}>
		<CodeEditor bind:source={inEditorSource} {language} />
	</div>
</div>
