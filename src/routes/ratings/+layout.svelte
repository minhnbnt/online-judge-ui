<script>
	import Root from '$lib/layouts/root.svelte';

	const { children } = $props();
</script>

<Root>
	{@render children()}
</Root>
