import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { AxiosError } from 'axios';

import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;

	if (!(await isAuthorized())) {
		error(403, 'Please signin to perform this action');
	}

	try {
		const config = await getAuthConfig();
		const response = await instance.get(`problems/${id}`, config);

		return response.data;
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		if (err.response?.status === 404) {
			error(404, `Problem with id "${id}" not found.`);
		}

		throw err;
	}
};
