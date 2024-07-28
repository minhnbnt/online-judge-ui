import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

import { instance } from '$lib/services/api';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	try {
		const response = await instance.get(`submissions/${params.viewId}`);
		return response.data;
	} catch (err) {
		console.error(err);
		error(err.response.status);
	}
};
