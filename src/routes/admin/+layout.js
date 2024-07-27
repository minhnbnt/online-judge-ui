import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';

import { getAccessToken } from '$lib/services/auth';
import { userInfo } from '$lib/stores/userInfo';
import { fetchUserInfo } from '$lib/services/userInfo';

export const ssr = false;

export async function load() {
	const accessToken = await getAccessToken();
	const isAuthorized = accessToken !== undefined;

	if (!isAuthorized) {
		error(401, 'Please signin as admin to perform this action');
	}

	let info = get(userInfo);

	/* We will check if cached userInfo is available
	   because fetch is really expensive call */
	if (info === undefined) {
		info = await fetchUserInfo(accessToken);
	}

	if (info === undefined) {
		error(500, 'Something went wrong.');
	}

	if (!info.is_staff) {
		error(403, 'Please signin as admin to perform this action');
	}
}
