<script>
	import { ArrowRightEndOnRectangle, Icon } from 'svelte-hero-icons';
	import Actions from './actions.svelte';

	import gotoLoginPage from '$lib/utils/gotoLoginPage';
	import { userInfo } from '$lib/stores/userInfo';

	const avatar =
		'https://cdn-icpc.ptit.edu.vn/ptitcode/profile/um4ZEmt54c1gAfO0m1wwQ7YxGbNZPOseEKs7Cvn8.png';

	$: username = $userInfo?.username;

	let revealAction = false;
</script>

<div class="absolute bottom-0 mt-3 w-full border-t bg-red-50 pt-3">
	{#if username !== undefined}
		{#if revealAction}
			<Actions />
		{/if}
		<button on:click={() => (revealAction = !revealAction)}>
			<img src={avatar} alt={username} class="h-11 rounded-full" />
			<p class="ms-3 truncate">{username}</p>
		</button>
	{:else}
		<button on:click={gotoLoginPage}>
			<Icon src={ArrowRightEndOnRectangle} solid class="size-7" />
			<p class="ms-3 font-medium">Login</p>
		</button>
	{/if}
</div>

<style>
	button {
		@apply flex w-full select-none items-center rounded-lg p-2 text-lg hover:bg-red-100;
	}
</style>
