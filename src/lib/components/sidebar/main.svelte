<script>
	import AccountActions from './actions/main.svelte';
	import Links from './links.svelte';
	import Head from './head.svelte';
</script>

<aside>
	<div class="relative h-full">
		<Head />
		<Links />
		<AccountActions />
	</div>
</aside>

<style>
	aside {
		@apply sticky top-0 z-40 h-screen min-w-64 bg-red-50 p-3 shadow;
		@apply dark:border-r dark:border-gray-500 dark:bg-gray-900 dark:shadow-none dark:text-white;
	}
</style>
