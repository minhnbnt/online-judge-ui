import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { AxiosError } from 'axios';

import { instance } from '$lib/services/api';

export const load: PageLoad = async ({ params }) => {
	const { viewId } = params;

	try {
		const response = await instance.get(`submissions/${viewId}`);
		return response.data;
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		if (err.response?.status === 404) {
			error(404, `Submission with id "${viewId}" not found.`);
		}

		throw err;
	}
};
