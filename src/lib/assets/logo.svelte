<script>
	const LOGO_SRC = 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg';
	const TAILWIND_LOGO_SRC = 'https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=500';
</script>

<img src={LOGO_SRC} alt="Svelte" />
<img src={TAILWIND_LOGO_SRC} alt="Tailwind CSS" />

<style>
	img {
		@apply h-full;
	}
</style>
