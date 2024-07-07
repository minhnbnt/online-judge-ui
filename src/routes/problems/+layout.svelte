<script lang="ts">
	import Sidebar from '$lib/components/sidebar.svelte';
</script>

<div class="flex max-h-screen bg-gray-50">
	<Sidebar />
	<main class="grow items-center justify-between overflow-y-auto">
		<slot />
	</main>
</div>
