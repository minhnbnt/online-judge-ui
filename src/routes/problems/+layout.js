import { refreshAccessToken } from '$lib/services/auth';

export const ssr = false;

export async function load() {
	await refreshAccessToken();
}
