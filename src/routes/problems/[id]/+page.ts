import type { PageLoad } from './$types';
import instance from '$lib/services/api';

export const ssr = false;

export const load: PageLoad = async ({ params }) => {
	try {
		const response = await instance.get(`problems/${params.id}`);
		return response.data;
	} catch (err) {
		console.log(err);
	}
};
