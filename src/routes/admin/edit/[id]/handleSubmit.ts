import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';
import { type ProblemSubmitPayload as Payload } from '$lib/types/problems';

export default async function handleSubmit(problemId: string, payload: Payload) {
	// TODO: handle on session expired
	if (!(await isAuthorized())) {
		return;
	}

	const config = await getAuthConfig();
	// TODO: handle on bad requests
	const response = await instance.put(`/problems/${problemId}/`, payload, config);
	const newProblemId = response.data.id;

	await goto(`/problems/${newProblemId}`);
}
