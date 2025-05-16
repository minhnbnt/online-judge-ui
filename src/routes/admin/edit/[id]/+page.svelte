<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	import handleSubmit from './handleSubmit';
	import { type ProblemSubmitPayload } from '$lib/types/problems';
	import ProblemEditor from '$lib/components/problemEditor.svelte';

	let { data } = $props();
	const { id: problemId } = data as ProblemSubmitPayload;

	const wrapperClass = twMerge(
		'm-10 flex flex-col rounded-lg border bg-white p-[1.25rem] shadow space-y-3',
		'dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:shadow-none'
	);
</script>

<div class={wrapperClass}>
	<h1 class="mb-5 text-2xl font-bold">Edit Problem</h1>
	<ProblemEditor
		initialValue={data}
		handleSubmit={(editedProblem) => handleSubmit(problemId, editedProblem)}
	/>
</div>
