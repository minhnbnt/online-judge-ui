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

<div
	transition:fly={{ duration: 200, y: 20 }}
	class="mb-3 flex min-w-fit flex-col rounded-lg bg-white p-1 shadow"
>
	{#each actions as { name, func }}
		<button class="m-1 rounded text-start hover:bg-gray-100" on:click={func}>
			<p class="ms-1">{name}</p>
		</button>
	{/each}
</div>
