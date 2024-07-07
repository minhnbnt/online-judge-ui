import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import instance from '$lib/services/api';

export const prerender = false;

export const load: PageLoad = async ({ params }) => {
	try {
		const response = await instance.get(`problems/${params.id}`);
		return response.data;
	} catch (err) {
		error(err.response.status);
	}
};