import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getAccessToken } from '$lib/services/auth';
import { type ProblemSubmitPayload as Payload } from '$lib/types/problem';

export default async function handleSubmit(payload: Payload) {
	const accessToken = await getAccessToken();

	// TODO: handle on session expired
	if (accessToken === undefined) {
		return;
	}

	const config = {
		headers: { Authorization: `Bearer ${accessToken}` }
	};

	// TODO: handle on bad requests
	await instance.post('/problems/', payload, config);

	await goto('/problems');
}
