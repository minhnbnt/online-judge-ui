<script>
	import { PUBLIC_LOGO_SRC } from '$env/static/public';

	const TAILWIND_LOGO_SRC = 'https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500';
	const HOME_PAGE = 'https://svelte.dev/';
</script>

<a href={HOME_PAGE}>
	<div class="flex items-center p-2">
		<img src={PUBLIC_LOGO_SRC} alt="Svelte" class="h-9" />
		<img src={TAILWIND_LOGO_SRC} alt="Svelte" class="ml-2 h-9" />

		<p class="ms-2 text-xl font-semibold">Online Judge</p>
	</div>
</a>

<style>
	a {
		@apply flex rounded-lg hover:bg-red-100;
	}
</style>
