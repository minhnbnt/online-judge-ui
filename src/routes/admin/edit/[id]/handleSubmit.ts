import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getAuthConfig, isAuthorized } from '$lib/services/auth';
import { type ProblemSubmitPayload as Payload } from '$lib/types/problem';

export default async function handleSubmit(payload: Payload) {
	// TODO: handle on session expired
	if (!(await isAuthorized())) {
		return;
	}

	const config = await getAuthConfig();
	// TODO: handle on bad requests
	await instance.put('/problems/', payload, config);

	await goto('/problems');
}
