import { get } from 'svelte/store';

import { refreshAccessToken } from '$lib/services/auth';
import { accessTokenStore } from '$lib/stores/userInfo';

export const ssr = true;

export async function load() {
	if (get(accessTokenStore) !== undefined) {
		await refreshAccessToken();
	}
}
