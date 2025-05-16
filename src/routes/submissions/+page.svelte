<script lang="ts">
	import { fade } from 'svelte/transition';

	import { fetchPage } from '$lib/utils/fetchPage';
	import Loading from '$lib/assets/loading.svelte';
	import SubmissionList from '$lib/components/submissionsList.svelte';

	import type { Submission } from '$lib/types/submissions';
	import Pagination from '$lib/components/pagination.svelte';

	let { activePage = $bindable(1) } = $props();
	let promise = $derived.by(() => fetchPage<Submission>('/submissions', activePage));
</script>

{#await promise}
	<div class="m-10 flex h-screen items-center justify-center dark:border-gray-500">
		<Loading class="size-12" />
	</div>
{:then { results: submissions, nPages }}
	<div class="m-10 mb-0 flex justify-end">
		<Pagination numberOfPages={nPages} currentPage={activePage} class="shadow" />
	</div>

	{#if submissions.length > 0}
		<div
			class="m-10 mt-5 max-w-full overflow-hidden rounded-lg border shadow dark:border-gray-500"
			transition:fade={{ duration: 200 }}
		>
			<SubmissionList {submissions} />
		</div>
	{/if}
{/await}
