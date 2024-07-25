import { get } from 'svelte/store';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';

import { isAuthorized } from '$lib/services/auth';
import { userInfo } from '$lib/stores/userInfo';

export const ssr = false;

export const load: LayoutLoad = async () => {
	if (!(await isAuthorized())) {
		error(401, 'Please signin as admin to perform this action');
	}

	/* this will always false if authorized
	 * but to get rid of eslint we will still handle it */
	const info = get(userInfo);
	if (info === undefined) {
		error(500, 'Something went wrong.');
	}

	if (!info.is_staff) {
		error(403, 'Please signin as admin to perform this action');
	}
};
