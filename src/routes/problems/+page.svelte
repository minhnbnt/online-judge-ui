<script lang="ts">
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

<ProblemList problems={data.results} />

{#if $userInfo?.is_staff}
	<a class="absolute bottom-10 right-10 rounded-lg bg-white p-3 shadow" href="/admin/create">
		<Icon src={Plus} class="size-8" />
	</a>
{/if}
