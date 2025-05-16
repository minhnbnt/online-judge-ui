<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { twMerge } from 'tailwind-merge';
	import { Plus, Icon } from 'svelte-hero-icons';

	import { userInfo } from '$lib/stores/userInfo';
	import { fetchPage } from '$lib/utils/fetchPage';
	import Loading from '$lib/assets/loading.svelte';
	import Pagination from '$lib/components/pagination.svelte';
	import ProblemList from '$lib/components/problemList.svelte';
	import { type ProblemEntry as Problem } from '$lib/types/problems';

	let { activePage = $bindable(1) } = $props();
	let promise = $derived.by(() => fetchPage<Problem>('/problems', activePage));

	const createProblemClass = twMerge(
		'absolute bottom-10 right-10 rounded-lg border bg-white p-3 shadow',
		'dark:bg-gray-800 dark:text-white dark:border-gray-500'
	);
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

{#await promise}
	<div class="m-10 flex h-full items-center justify-center">
		<Loading class="size-12" />
	</div>
{:then { results: problems, nPages }}
	{#if problems.length > 0}
		<div class="m-10 flex justify-end space-y-5">
			<Pagination bind:currentPage={activePage} numberOfPages={nPages} class="shadow" />
		</div>

		<ProblemList {problems} class="mt-0" />
	{/if}
{/await}

{#if $userInfo?.is_staff}
	<button
		title="Create new problem."
		onclick={() => goto('/admin/create')}
		transition:fade={{ duration: 200 }}
		class={createProblemClass}
	>
		<Icon src={Plus} class="size-8" />
	</button>
{/if}
