import { onMount } from 'svelte';
import { goto } from '$app/navigation';

import { getUserInfo } from '$lib/stores/userInfo';
import { addNotification } from '$lib/stores/notification';

async function checkIfLoggedin(nextUrl: string) {
	const info = await getUserInfo();
	if (info === undefined) {
		return;
	}

	addNotification({
		text: `You are logged in as user: ${info.username}`,
		position: 'bottom-center',
		removeAfter: 5000
	});

	await goto(nextUrl);
}

export default function redirectIfLoggedIn(nextUrl = '/') {
	onMount(async () => await checkIfLoggedin(nextUrl));
}
