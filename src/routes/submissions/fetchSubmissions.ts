import instance from '$lib/services/api';
import type { Submission } from '$lib/types/submissions';

export default async function fetchSubmissions(page: number) {
	const config = { params: { page } };

	try {
		const response = await instance.get('/submissions', config);
		return response.data.results as Submission[];
	} catch (error) {
		// TODO: send notification on error
		return [];
	}
}
