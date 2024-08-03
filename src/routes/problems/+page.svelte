<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { Plus, Icon } from 'svelte-hero-icons';
	import { PUBLIC_API_PAGE_SIZE } from '$env/static/public';

	import { instance } from '$lib/services/api';
	import { getUserInfo } from '$lib/stores/userInfo';
	import Loading from '$lib/assets/loading.svelte';
	import ProblemList from '$lib/components/problemList.svelte';
	import PageSelector from '$lib/components/pageSelector.svelte';

	import { type ProblemEntry as Problem } from '$lib/types/problem';

	export let activePage = 1;
	let numberOfPages: number | undefined;

	async function fetchProblem(page: number) {
		const config = { params: { page } };

		try {
			const response = await instance.get('/problems', config);
			const { count, results } = response.data;

			numberOfPages = Math.ceil(count / PUBLIC_API_PAGE_SIZE);

			return results as Problem[];
		} catch (error) {
			// TODO: send notification on error
			numberOfPages = undefined;
			return [];
		}
	}

	$: promise = fetchProblem(activePage);
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

{#if numberOfPages}
	<div class="m-10 flex justify-end">
		<PageSelector bind:activePage bind:numberOfPages />
	</div>
{/if}

{#await promise}
	<div class="m-10 flex grow justify-center">
		<Loading class="size-12 animate-spin fill-red-400 text-gray-300" />
	</div>
{:then problems}
	{#if problems.length > 0}
		<div class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow">
			<ProblemList {problems} />
		</div>
	{/if}
{/await}

{#await getUserInfo() then info}
	{#if info?.is_staff}
		<button
			title="Create new problems."
			on:click={() => goto('/admin/create')}
			transition:fade={{ duration: 200 }}
			class="absolute bottom-10 right-10 rounded-lg bg-white p-3 shadow"
		>
			<Icon src={Plus} class="size-8" />
		</button>
	{/if}
{/await}
