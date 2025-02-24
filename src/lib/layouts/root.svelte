<script>
	import Sidebar from '$lib/components/sidebar/index.svelte';

	let { children } = $props();
</script>

<div class="relative flex bg-gray-50 dark:bg-gray-950">
	<Sidebar />
	<main class="grow">
		{@render children()}
	</main>
</div>
