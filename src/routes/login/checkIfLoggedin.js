import { goto } from '$app/navigation';
import { get } from 'svelte/store';

import { isAuthorized } from '$lib/services/auth';
import { notifyContextStore } from '$lib/stores/notification';
import { userInfo } from '$lib/stores/userInfo';

export default async function checkIfLoggedin() {
	if (!(await isAuthorized())) {
		return;
	}

	const { addNotification } = get(notifyContextStore);

	const info = get(userInfo);
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
