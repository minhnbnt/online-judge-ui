<script lang="ts">
	import { goto } from '$app/navigation';
	import { Plus, Icon } from 'svelte-hero-icons';

	import ProblemList from '$lib/components/problemList.svelte';
	import { userInfo } from '$lib/stores/userInfo';

	interface Problem {
		id: string;
		title: string;
		level: number;
	}

	interface ProblemsResponse {
		count: number;
		next?: string;
		previous?: string;
		results: Array<Problem>;
	}

	export let data: ProblemsResponse;
</script>

<svelte:head>
	<title>Online Judge</title>
</svelte:head>

<div class="m-10 max-w-full overflow-hidden rounded-lg border bg-white shadow">
	<ProblemList problems={data.results} />
</div>

{#if $userInfo?.is_staff}
	<button
		title="Create new problems."
		on:click={() => goto('/admin/create')}
		class="absolute bottom-10 right-10 rounded-lg bg-white p-3 shadow"
	>
		<Icon src={Plus} class="size-8" />
	</button>
{/if}
