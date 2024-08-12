import { instance } from '$lib/services/api';

import { PUBLIC_API_PAGE_SIZE } from '$env/static/public';
import { type ProblemEntry } from '$lib/types/problem';

export async function fetchProblem(page: number) {
	type Response = {
		count: number;
		results: ProblemEntry[];
	};

	const config = { params: { page } };
	const response = await instance.get('/problems', config);
	const { count, results } = response.data as Response;

	const pageSize = parseInt(PUBLIC_API_PAGE_SIZE);
	const numberOfPages = Math.ceil(count / pageSize);

	return { numberOfPages, problems: results };
}
