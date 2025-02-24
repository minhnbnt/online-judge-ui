<script lang="ts">
	import { twMerge } from 'tailwind-merge';
	import AdminActions from './adminActions.svelte';

	import { userInfo } from '$lib/stores/userInfo';
	import Submit from '$lib/components/problemSubmittor/index.svelte';

	let { id, level, title } = $props();

	const headerClassname = twMerge(
		'bg-white dark:border-gray-500 dark:bg-gray-900 dark:text-white',
		'sticky top-0 z-30 flex border-b px-10 py-3 shadow'
	);
</script>

<header class={headerClassname}>
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
</header>
