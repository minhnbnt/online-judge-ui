import { error } from '@sveltejs/kit';

import { AxiosError } from 'axios';
import type { PageLoad } from '../$types';

import { instance } from '$lib/services/api';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;

	try {
		const response = await instance.get(`problems/${id}`);
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
