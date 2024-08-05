<script lang="ts">
	import handleSubmit from './handleSubmit';

	import ProblemEditor from '$lib/components/problemEditor.svelte';
</script>

<div class="wrapper m-10 flex flex-col space-y-3 rounded-lg border p-5 shadow">
	<h1>Create Problem</h1>
	<ProblemEditor {handleSubmit} />
</div>

<style>
	h1 {
		@apply mb-5 text-2xl font-bold;
	}

	.wrapper {
		@apply m-10 flex flex-col space-y-3 rounded-lg border bg-white p-[1.25rem] shadow;
		@apply dark:bg-gray-800 dark:text-white dark:shadow-none;
		@apply dark:border-gray-500;
	}
</style>
