<script>
	import Logo from '$lib/assets/logo.svelte';

	const HOME_PAGE = 'https://svelte.dev/';
</script>

<a href={HOME_PAGE}>
	<div class="flex items-center p-2">
		<div class="flex h-9 space-x-2">
			<Logo />
		</div>
		<p class="ms-2 text-xl font-semibold">Online Judge</p>
	</div>
</a>
