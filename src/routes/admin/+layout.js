import { error } from '@sveltejs/kit';

import { getAccessToken } from '$lib/services/auth';
import { getUserInfo } from '$lib/stores/userInfo';

export const ssr = false;

export async function load() {
	const accessToken = await getAccessToken();
	const isAuthorized = accessToken !== undefined;

	if (!isAuthorized) {
		error(401, 'Please signin as admin to perform this action');
	}

	let info = await getUserInfo();

	if (info === undefined) {
		error(500, 'Something went wrong.');
	}

	if (!info.is_staff) {
		error(403, 'Please signin as admin to perform this action');
	}
}
