<script lang="ts">
	import { fade } from 'svelte/transition';

	import fetchPage from '$lib/utils/fetchPage';
	import Loading from '$lib/assets/loading.svelte';
	import PageSelector from '$lib/components/pageSelector.svelte';
	import SubmissionList from '$lib/components/submissionsList.svelte';

	import type { Submission } from '$lib/types/submissions';

	export let activePage: number;
	let numberOfPages = 0;

	async function onActiveChange(page: number) {
		const { nPages, results } = await fetchPage('/submissions', page);

		numberOfPages = nPages;
		return results as Submission[];
	}

	$: promise = onActiveChange(activePage);
</script>

{#if numberOfPages > 1}
	<div class="m-10 flex justify-end">
		<PageSelector bind:activePage bind:numberOfPages />
	</div>
{/if}

{#await promise}
	<div class="m-10 flex h-12 justify-center">
		<Loading class="size-12" />
	</div>
{:then submissions}
	{#if submissions.length > 0}
		<div
			class="m-10 max-w-full overflow-hidden rounded-lg border shadow"
			transition:fade={{ duration: 200 }}
		>
			<SubmissionList {submissions} />
		</div>
	{/if}
{/await}

<style>
	* {
		@apply dark:border-gray-500;
	}
</style>
