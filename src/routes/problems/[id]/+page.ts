import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import { AxiosError } from 'axios';

import { instance } from '$lib/services/api';
import getCarta from '$lib/components/markdown/config';
import type { ProblemEntry } from '$lib/types/problems';

export const load: PageLoad = async ({ params }) => {
	const { id } = params;

	try {
		const [problems, carta] = await Promise.all([instance.get(`problems/${id}`), getCarta()]);
		return { problem: problems.data as ProblemEntry, carta };
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
