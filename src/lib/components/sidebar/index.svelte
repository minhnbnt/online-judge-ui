<script>
	import { twMerge } from 'tailwind-merge';

	import AccountActions from './actions.svelte';
	import Links from './links.svelte';
	import Head from './head.svelte';

	const asideClassname = twMerge(
		'sticky top-0 z-40 h-screen min-w-64 bg-red-50 p-3 shadow',
		'dark:border-r dark:border-gray-500 dark:bg-gray-900 dark:text-white dark:shadow-none'
	);

	const aClassname = twMerge(
		'flex rounded-lg transition-colors duration-200 hover:bg-red-100',
		'dark:hover:bg-rose-950'
	);
</script>

<aside class={asideClassname}>
	<div class="relative h-full">
		<Head class={aClassname} />
		<Links class={aClassname} />
		<AccountActions />
	</div>
</aside>
