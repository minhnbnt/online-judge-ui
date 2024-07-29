import { error } from '@sveltejs/kit';

import type { PageLoad } from './$types';
import { AxiosError } from 'axios';

import { instance } from '$lib/services/api';

export const load: PageLoad = async () => {
	try {
		const response = await instance.get('problems/');
		return response.data;
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		if (err.response === undefined) {
			throw err;
		}

		console.error(err.response.data);
		error(err.response.status);
	}
};
