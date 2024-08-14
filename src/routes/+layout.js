import { get } from 'svelte/store';

import { refreshAccessToken } from '$lib/services/auth';
import { accessTokenStore } from '$lib/stores/userInfo';

export const ssr = false;

export async function load() {
	/* sometimes accessToken can be undefined even if logged in
	 * this can happen when user enter website with refreshToken available */
	if (get(accessTokenStore) === undefined) {
		await refreshAccessToken();
	}
}
