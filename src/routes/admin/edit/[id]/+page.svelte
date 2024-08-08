<script lang="ts">
	import handleSubmit from './handleSubmit';
	import { type ProblemSubmitPayload } from '$lib/types/problem';

	export let data: ProblemSubmitPayload;

	import ProblemEditor from '$lib/components/problemEditor.svelte';
</script>

<div class="wrapper">
	<h1>Edit Problem</h1>
	<ProblemEditor initialValue={data} {handleSubmit} />
</div>

<style>
	h1 {
		@apply mb-5 text-2xl font-bold;
	}

	.wrapper {
		@apply m-10 flex flex-col rounded-lg border bg-white p-[1.25rem] shadow;
		@apply dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:shadow-none;
	}
</style>
