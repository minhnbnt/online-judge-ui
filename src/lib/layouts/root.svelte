<script>
	import Sidebar from '$lib/components/sidebar/main.svelte';
	import { NotificationDisplay } from '@beyonk/svelte-notifications';
</script>

<div class="relative flex max-h-screen bg-gray-50">
	<NotificationDisplay />
	<Sidebar />
	<main class="grow items-center justify-between overflow-y-auto">
		<slot />
	</main>
</div>
