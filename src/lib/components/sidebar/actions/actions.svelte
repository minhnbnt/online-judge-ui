<script>
	import { fly } from 'svelte/transition';

	import { handleLoggedOut } from '$lib/services/auth';
	import gotoLoginPage from '$lib/utils/gotoLoginPage';
	import { toggleDarkMode } from '$lib/stores/darkmode';

	function onClickLogout() {
		handleLoggedOut();
		gotoLoginPage();
	}
</script>

<div transition:fly={{ duration: 200, y: 20 }}>
	<button on:click={onClickLogout}>
		<p>Logout</p>
	</button>
	<button on:click={toggleDarkMode}>
		<p>Toggle dark mode</p>
	</button>
</div>

<style>
	div {
		@apply mb-3 flex min-w-fit flex-col rounded-lg bg-white p-1 shadow;
		@apply dark:bg-gray-800 dark:shadow-none;
	}

	button {
		@apply m-1 rounded px-1 text-start hover:bg-gray-100;
		@apply dark:hover:bg-gray-700;
	}
</style>
