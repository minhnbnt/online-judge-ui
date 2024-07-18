import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { isAuthorized } from '$lib/services/auth';

export const load: PageLoad = async () => {
	if (await isAuthorized()) {
		redirect(303, '/');
	}
};
