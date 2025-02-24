<script>
	import Root from '$lib/layouts/root.svelte';

	let { children } = $props();
</script>

<Root>
	{@render children()}
</Root>
