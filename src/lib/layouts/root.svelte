<script>
	import Sidebar from '$lib/components/sidebar/main.svelte';
</script>

<div class="relative flex max-h-screen bg-gray-50">
	<Sidebar />
	<main class="grow items-center justify-between overflow-y-auto">
		<slot />
	</main>
</div>
