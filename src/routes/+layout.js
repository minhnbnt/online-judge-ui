import { refreshAccessToken } from '$lib/services/auth';

export const ssr = true;

export async function load() {
	await refreshAccessToken();
}
