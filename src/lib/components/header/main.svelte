<script lang="ts">
	import Submit from '$lib/components/submit/main.svelte';
	import { userInfo } from '$lib/stores/userInfo';
	import AdminActions from './adminActions.svelte';

	export let id: string;
	export let title: string;
	export let level: number;
</script>

<head class="sticky top-0 z-30 flex border-b px-10 py-3 shadow">
	<div class="mt-2 flex grow items-center space-x-5">
		<div class="flex grow justify-between text-lg">
			<p><span class="font-bold">{id}</span> - {title}</p>
			<p>Level: {level}</p>
		</div>

		{#if $userInfo?.is_staff}
			<AdminActions problemId={id} />
		{/if}

		<Submit problem={id} class="w-fit" />
	</div>
</head>

<style>
	head {
		@apply bg-white dark:border-gray-500 dark:bg-gray-900 dark:text-white;
	}
</style>
