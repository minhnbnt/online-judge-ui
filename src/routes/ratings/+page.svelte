<script lang="ts">
	import Loading from '$lib/assets/loading.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import RatingList from '$lib/components/ratingList.svelte';
	import { type RatingRow } from '$lib/types/ratingRow';
	import { fetchPage } from '$lib/utils/fetchPage';

	let { activePage = $bindable(1) } = $props();
	let promise = $derived.by(() => fetchPage<RatingRow>('/ratings/', activePage));
</script>

{#await promise}
	<div class="m-10 flex h-full items-center justify-center">
		<Loading class="size-12" />
	</div>
{:then { results, nPages }}
	{#if results.length > 0}
		<div class="m-10 flex justify-end space-y-5">
			<Pagination bind:currentPage={activePage} numberOfPages={nPages} class="shadow" />
		</div>

		<RatingList ratings={results} />
	{/if}
{/await}
