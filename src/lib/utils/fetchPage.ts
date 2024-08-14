import { PUBLIC_API_PAGE_SIZE } from '$env/static/public';
import { instance } from '$lib/services/api';

export default async function fetchPage(url: string, page: number) {
	type ReturnType = {
		nPages: number;
		results: unknown;
	};

	const config = { params: { page } };

	const response = await instance.get(url, config);
	const { count, results } = response.data;

	const pageSize = parseInt(PUBLIC_API_PAGE_SIZE);
	const nPages = Math.ceil(count / pageSize);

	return { nPages, results } as ReturnType;
}
