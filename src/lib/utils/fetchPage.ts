import { PUBLIC_API_PAGE_SIZE } from '$env/static/public';
import { instance } from '$lib/services/api';

const pageSize = parseInt(PUBLIC_API_PAGE_SIZE);

export function getPageParams(pageNumber: number) {
	return {
		limit: pageSize,
		offset: (pageNumber - 1) * pageSize
	};
}

export async function fetchPage<T>(url: string, page: number, params: object = {}) {
	type ReturnType = {
		nPages: number;
		results: T[];
	};

	params = { ...params, ...getPageParams(page) };
	const response = await instance.get(url, { params });
	const { count, results } = response.data;

	const nPages = Math.ceil(count / pageSize);

	return { nPages, results } as ReturnType;
}
