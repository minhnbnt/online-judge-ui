import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { AxiosError } from 'axios';

import { instance } from '$lib/services/api';

interface Problem {
	id: string;
	title: string;
	description: string;
	level: number;
}

export const load: PageLoad = async ({ params }) => {
	const { id } = params;

	try {
		const response = await instance.get(`problems/${id}`);
		return response.data as Problem;
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
