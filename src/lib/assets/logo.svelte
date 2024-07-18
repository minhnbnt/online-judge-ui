<script>
	import { PUBLIC_LOGO_SRC } from '$env/static/public';
	const TAILWIND_LOGO_SRC = 'https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500';
</script>

<img src={PUBLIC_LOGO_SRC} alt="Svelte" />
<img src={TAILWIND_LOGO_SRC} alt="Tailwind CSS" />

<style>
	img {
		@apply h-full;
	}
</style>
