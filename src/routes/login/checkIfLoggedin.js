import { get } from 'svelte/store';
import { goto } from '$app/navigation';

import { getUserInfo } from '$lib/stores/userInfo';
import { notifyContextStore } from '$lib/stores/notification';

export default async function checkIfLoggedin(nextUrl = '/') {
	const info = await getUserInfo();
	if (info === undefined) {
		return;
	}

	const { addNotification } = get(notifyContextStore);

	addNotification({
		text: `You are logged in as user: ${info.username}`,
		position: 'bottom-center',
		removeAfter: 5000
	});

	await goto(nextUrl);
}
