<script lang="ts">
	import handleSubmit from './handleSubmit';

	import ProblemEditor from '$lib/components/problemEditor.svelte';
	import { twMerge } from 'tailwind-merge';

	const wrapperClass = twMerge(
		'm-10 flex flex-col rounded-lg border bg-white p-[1.25rem] shadow space-y-3',
		'dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:shadow-none'
	);
</script>

<div class={wrapperClass}>
	<h1 class="mb-5 text-2xl font-bold">Create Problem</h1>
	<ProblemEditor {handleSubmit} />
</div>
