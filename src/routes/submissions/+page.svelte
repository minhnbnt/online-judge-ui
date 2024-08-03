<script lang="ts">
	import { fade } from 'svelte/transition';
	import { PUBLIC_API_PAGE_SIZE } from '$env/static/public';

	import { instance } from '$lib/services/api';
	import { type Submission } from '$lib/types/submissions';
	import Loading from '$lib/assets/loading.svelte';
	import SubmissionList from '$lib/components/submissionsList.svelte';
	import PageSelector from '$lib/components/pageSelector.svelte';

	export let activePage = 1;
	let numberOfPages: number | undefined;

	async function fetchSubmissions(page: number) {
		const config = { params: { page } };

		try {
			const response = await instance.get('/submissions', config);
			const { count, results } = response.data;

			numberOfPages = Math.ceil(count / PUBLIC_API_PAGE_SIZE);

			return results as Submission[];
		} catch (error) {
			// TODO: send notification on error
			numberOfPages = undefined;
			return [];
		}
	}

	$: promise = fetchSubmissions(activePage);
</script>

{#if numberOfPages}
	<div class="m-10 flex justify-end">
		<PageSelector bind:activePage bind:numberOfPages />
	</div>
{/if}

{#await promise}
	<div class="m-10 flex grow justify-center">
		<Loading class="size-12 animate-spin fill-red-400 text-gray-300" />
	</div>
{:then submissions}
	{#if submissions.length > 0}
		<div
			class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow"
			transition:fade={{ duration: 200 }}
		>
			<SubmissionList {submissions} />
		</div>
	{/if}
{/await}
