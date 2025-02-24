<script>
	import { getNotificationsContext } from 'svelte-notifications';
	import { onMount } from 'svelte';

	import { notifyContextStore } from '$lib/stores/notification';

	onMount(() => {
		const context = getNotificationsContext();
		notifyContextStore.set(context);
	});

	let { children } = $props();
</script>

{@render children()}
