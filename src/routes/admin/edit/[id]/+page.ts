import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { AxiosError } from 'axios';

import { instance } from '$lib/services/api';
import { getAccessToken } from '$lib/services/auth';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;

	const accessToken = await getAccessToken();
	if (!accessToken === undefined) {
		error(403, 'Please signin as admin to perform this action');
	}

	const config = {
		headers: { Authorization: `Bearer ${accessToken}` }
	};

	try {
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
