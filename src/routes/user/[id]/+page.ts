import { AxiosError } from 'axios';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { instance } from '$lib/services/api';
import type { UserInfoResponse } from '$lib/types/userInfo';

export const load: PageLoad = async ({ params, url }) => {
	const { id: userId } = params;

	let pageParams = url.searchParams.get('page');
	if (pageParams === null) {
		pageParams = '1';
	}

	try {
		const { data } = await instance.get(`users/info/${userId}`);

		return {
			profile: data as UserInfoResponse,
			pageNumber: parseInt(pageParams)
		};
	} catch (err) {
		if (!(err instanceof AxiosError)) {
			throw err;
		}

		if (err.response?.status === 404) {
			error(404, `Problem with id "${userId}" not found.`);
		}

		throw err;
	}
};
