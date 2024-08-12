<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { Plus, Icon } from 'svelte-hero-icons';

	import { fetchProblem } from './apiCalls';
	import { userInfo } from '$lib/stores/userInfo';
	import Loading from '$lib/assets/loading.svelte';
	import ProblemList from '$lib/components/problemList.svelte';
	import PageSelector from '$lib/components/pageSelector.svelte';
	import { type ProblemEntry as Problem } from '$lib/types/problem';

	export let activePage = 1;

	let problems: Problem[] = [];
	let numberOfPages: number | undefined;

	let isLoading = false;

	async function onActiveChange(activePage: number) {
		isLoading = true;

		try {
			const results = await fetchProblem(activePage);

			numberOfPages = results.numberOfPages;
			problems = results.problems;
		} catch (err) {
			console.log(err);
		} finally {
			isLoading = false;
		}
	}

	$: onActiveChange(activePage);
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

<div class="m-10 justify-end empty:hidden">
	{#if numberOfPages !== undefined && numberOfPages > 1}
		<PageSelector bind:activePage bind:numberOfPages />
	{/if}
</div>

{#if isLoading}
	<div class="m-10 flex h-12 justify-center">
		<Loading class="size-12" />
	</div>
{:else if problems.length > 0}
	<div class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow">
		<ProblemList {problems} />
	</div>
{/if}

{#if $userInfo?.is_staff}
	<button
		title="Create new problem."
		on:click={() => goto('/admin/create')}
		transition:fade={{ duration: 200 }}
		class="create-problem"
	>
		<Icon src={Plus} class="size-8" />
	</button>
{/if}

<style>
	* {
		@apply dark:border-gray-500;
	}

	.create-problem {
		@apply absolute bottom-10 right-10 rounded-lg border bg-white p-3 shadow;
		@apply dark:bg-gray-800 dark:text-white;
	}
</style>
