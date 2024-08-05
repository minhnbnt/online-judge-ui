<script>
	import { fly } from 'svelte/transition';

	import { handleLoggedOut } from '$lib/services/auth';
	import gotoLoginPage from '$lib/utils/gotoLoginPage';

	const actions = [
		{
			name: 'Logout',
			func() {
				handleLoggedOut();
				gotoLoginPage();
			}
		}
	];
</script>

<div transition:fly={{ duration: 200, y: 20 }}>
	{#each actions as { name, func }}
		<button on:click={func}>
			<p class="ms-1">{name}</p>
		</button>
	{/each}
</div>

<style>
	div {
		@apply mb-3 flex min-w-fit flex-col rounded-lg bg-white p-1 shadow;
		@apply dark:bg-gray-800 dark:shadow-none;
	}

	button {
		@apply m-1 rounded text-start hover:bg-gray-100;
		@apply dark:hover:bg-gray-700;
	}
</style>
