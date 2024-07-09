<script>
	import { PUBLIC_LOGO_SRC } from '$env/static/public';

	const HOME_PAGE = 'https://svelte.dev/';
</script>

<nav class="sticky top-0 z-50 items-center bg-red-50 shadow-red-50">
	<div class="flex items-center justify-between p-4 lg:px-8">
		<!-- Icon -->
		<div>
			<a href={HOME_PAGE}>
				<img class="h-9" src={PUBLIC_LOGO_SRC} alt="Svelte" />
			</a>
		</div>

		<!-- Links -->
		<div class="flex">
			<a class="header-link" href="problems">Problems</a>
			<a class="header-link" href="submissions">Submissions</a>
			<a class="header-link" href="ranking">Ranking</a>
		</div>

		<!-- account -->
		<div>
			<a class="header-link" href="login">Login</a>
		</div>
	</div>
</nav>

<style>
	.header-link {
		@apply m-1 flex rounded-lg p-1 px-2 font-semibold text-gray-700 transition-colors hover:bg-red-100 hover:text-black;
	}
</style>
