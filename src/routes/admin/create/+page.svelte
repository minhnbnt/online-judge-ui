<script lang="ts">
	import handleSubmit from './handleSubmit';

	import ProblemEditor from '$lib/components/problemEditor.svelte';
</script>

<div class="wrapper">
	<h1>Create Problem</h1>
	<ProblemEditor {handleSubmit} />
</div>

<style>
	.wrapper {
		@apply m-10 flex flex-col rounded-lg border bg-white p-[1.25rem] shadow;
		@apply dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:shadow-none;
	}

	h1 {
		@apply mb-5 text-2xl font-bold;
	}
</style>
