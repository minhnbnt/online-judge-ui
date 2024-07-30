import { goto } from '$app/navigation';
import { get } from 'svelte/store';

import { getAccessToken } from '$lib/services/auth';
import { fetchUserInfo } from '$lib/services/userInfo';
import { userInfo } from '$lib/stores/userInfo';
import { notifyContextStore } from '$lib/stores/notification';

export default async function checkIfLoggedin() {
	const accessToken = await getAccessToken();
	if (accessToken === undefined) {
		return;
	}

	const { addNotification } = get(notifyContextStore);

	let info = get(userInfo);
	if (info === undefined) {
		info = await fetchUserInfo(accessToken);
	}

	if (info === undefined) {
		return;
	}

	addNotification({
		text: `You are logged in as user: ${info.username}`,
		position: 'bottom-center',
		removeAfter: 5000
	});

	await goto('/');
}
