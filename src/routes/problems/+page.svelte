<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { Plus, Icon } from 'svelte-hero-icons';

	import { userInfo } from '$lib/stores/userInfo';
	import ProblemList from '$lib/components/problemList.svelte';

	import { type ProblemEntry as Problem } from '$lib/types/problems';
	import fetchPage from '$lib/utils/fetchPage';
	import Loading from '$lib/assets/loading.svelte';
	import { twMerge } from 'tailwind-merge';

	let { activePage = $bindable() } = $props();

	async function onActiveChange(page: number) {
		const { results } = await fetchPage('/problems', page);
		return results as Problem[];
	}

	let promise = $derived.by(() => onActiveChange(activePage));

	const createProblemClass = twMerge(
		'absolute bottom-10 right-10 rounded-lg border bg-white p-3 shadow',
		'dark:bg-gray-800 dark:text-white dark:border-gray-500'
	);
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

{#await promise}
	<div class="m-10 flex h-12 justify-center">
		<Loading class="size-12" />
	</div>
{:then problems}
	{#if problems.length > 0}
		<ProblemList {problems} />
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
