<script>
	import Notifications from 'svelte-notifications';

	import Element from './notification.svelte';
	import Context from './context.svelte';

	let { children } = $props();
</script>

<Notifications item={Element} zIndex={2000}>
	<Context>{@render children()}</Context>
</Notifications>
