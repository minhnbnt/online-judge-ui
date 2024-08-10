<script>
	import { ArrowRightEndOnRectangle, Icon } from 'svelte-hero-icons';

	import Actions from './actions.svelte';
	import Loading from '$lib/assets/loading.svelte';
	import gotoLoginPage from '$lib/utils/gotoLoginPage';
	import { accessTokenStore, userInfo } from '$lib/stores/userInfo';

	const avatar =
		'https://cdn-icpc.ptit.edu.vn/ptitcode/profile/zWGiE6M26FtipuZTIafynTqQjarIRoaIrvlY4FqP.png';

	let revealAction = false;
</script>

<div class="absolute bottom-0 mt-3 w-full border-t bg-inherit pt-3 dark:border-gray-500">
	{#if $accessTokenStore === undefined}
		<!-- Isn't logged in -->
		<button on:click={gotoLoginPage}>
			<Icon src={ArrowRightEndOnRectangle} solid class="size-7" />
			<p class="ms-3 font-medium">Login</p>
		</button>
	{:else if $userInfo === undefined}
		<!-- Fetching data -->
		<Loading class="size-12 animate-spin fill-red-400 text-gray-300" />
	{:else}
		<!-- Fetched -->
		{@const username = $userInfo.username}

		{#if revealAction}
			<Actions />
		{/if}
		<button on:click={() => (revealAction = !revealAction)}>
			<img src={avatar} alt={username} class="h-11 rounded-full border dark:border-gray-500" />
			<p class="ms-3 truncate">{username}</p>
		</button>
	{/if}
</div>

<style>
	button {
		@apply flex w-full select-none items-center rounded-lg p-2 text-lg hover:bg-red-100;
		@apply transition-colors duration-200;

		@apply dark:hover:bg-rose-950;
	}
</style>
