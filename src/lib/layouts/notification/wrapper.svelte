<script>
	import { getNotificationsContext } from 'svelte-notifications';

	import { notifyContextStore } from '$lib/stores/notification';

	const context = getNotificationsContext();
	notifyContextStore.set(context);
</script>

<slot />
