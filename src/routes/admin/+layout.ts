import { isAuthorized } from '$lib/services/auth';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from '../$types';
import { get } from 'svelte/store';
import { userInfo } from '$lib/stores/userInfo';

export const ssr = false;

export const load: LayoutLoad = async () => {
	if (!(await isAuthorized())) {
		error(401, 'Please signin as admin to perform this action');
	}

	const { is_staff } = get(userInfo);
	if (!is_staff) {
		error(403, 'Please signin as admin to perform this action');
	}
};
