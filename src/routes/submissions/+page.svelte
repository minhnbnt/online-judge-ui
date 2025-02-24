<script lang="ts">
	import { fade } from 'svelte/transition';

	import fetchPage from '$lib/utils/fetchPage';
	import Loading from '$lib/assets/loading.svelte';
	import SubmissionList from '$lib/components/submissionsList.svelte';

	import type { Submission } from '$lib/types/submissions';

	export let activePage: number;

	async function onActiveChange(page: number) {
		const { results } = await fetchPage('/submissions', page);
		return results as Submission[];
	}

	$: promise = onActiveChange(activePage);
</script>

{#await promise}
	<div class="m-10 flex h-12 justify-center dark:border-gray-500">
		<Loading class="size-12" />
	</div>
{:then submissions}
	{#if submissions.length > 0}
		<div
			class="m-10 max-w-full overflow-hidden rounded-lg border shadow dark:border-gray-500"
			transition:fade={{ duration: 200 }}
		>
			<SubmissionList {submissions} />
		</div>
	{/if}
{/await}
