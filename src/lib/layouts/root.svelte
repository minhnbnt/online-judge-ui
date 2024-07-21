<script>
	import Sidebar from '$lib/components/sidebar/main.svelte';
</script>

<div class="relative flex bg-gray-50">
	<Sidebar />
	<main class="grow">
		<slot />
	</main>
</div>
