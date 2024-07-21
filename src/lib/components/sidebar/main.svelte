<script>
	import AccountActions from './actions/main.svelte';
	import Links from './links.svelte';
	import Head from './head.svelte';
</script>

<aside class="sticky top-0 z-[1000] col-span-1 h-screen min-w-64 bg-red-50 p-3 shadow">
	<div class="relative h-full">
		<Head />
		<Links />
		<AccountActions />
	</div>
</aside>
