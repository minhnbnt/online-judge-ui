<script>
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { ArrowRightEndOnRectangle, Icon } from 'svelte-hero-icons';

	import Loading from '$lib/assets/loading.svelte';
	import gotoLoginPage from '$lib/utils/gotoLoginPage';
	import { handleLoggedOut } from '$lib/services/auth';
	import { toggleDarkMode } from '$lib/stores/darkmode';
	import { accessTokenStore, userInfo } from '$lib/stores/userInfo';
	import { twMerge } from 'tailwind-merge';

	const avatar = `${base}/minhnbnt.png`;

	let revealAction = $state(false);

	function onClickLogout() {
		handleLoggedOut();
		gotoLoginPage();
	}

	const buttonClass = twMerge(
		'flex w-full select-none items-center rounded-lg p-2 text-lg hover:bg-red-100',
		'transition-colors duration-200 dark:hover:bg-rose-950'
	);

	const actionClassName = twMerge(
		'mb-3 flex min-w-fit flex-col rounded-lg bg-white p-1 shadow',
		'dark:bg-gray-800 dark:shadow-none'
	);

	const actionButtonClassName = twMerge(
		'm-1 rounded px-1 text-start hover:bg-gray-100',
		'dark:hover:bg-gray-700'
	);
</script>

<div class="absolute bottom-0 mt-3 w-full border-t bg-inherit pt-3 dark:border-gray-500">
	{#if $accessTokenStore === undefined}
		<!-- Isn't logged in -->
		<button class={buttonClass} onclick={gotoLoginPage}>
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
			<div class={actionClassName} transition:fly={{ duration: 200, y: 20 }}>
				<button class={actionButtonClassName} onclick={onClickLogout}>
					<p>Logout</p>
				</button>
				<button class={actionButtonClassName} onclick={toggleDarkMode}>
					<p>Toggle dark mode</p>
				</button>
			</div>
		{/if}

		<button class={buttonClass} onclick={() => (revealAction = !revealAction)}>
			<img src={avatar} alt={username} class="h-11 rounded-full border dark:border-gray-500" />
			<p class="ms-3 truncate">{username}</p>
		</button>
	{/if}
</div>
