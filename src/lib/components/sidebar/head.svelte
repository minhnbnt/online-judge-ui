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

<style>
	a {
		@apply flex rounded-lg transition-colors duration-200 hover:bg-red-100;
		@apply dark:hover:bg-rose-950;
	}
</style>
