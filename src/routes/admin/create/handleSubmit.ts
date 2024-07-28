import { goto } from '$app/navigation';

import { instance } from '$lib/services/api';
import { getAccessToken } from '$lib/services/auth';

interface Payload {
	id: string;
	title: string;
	description: string;
	level: number;
	stdin?: string;
	stdout: string;
	runFlags: string;
	timeLimit?: number;
	memoryLimit?: number;
}

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
	instance.post('/problems/', payload, config);

	await goto('/problems');
}
