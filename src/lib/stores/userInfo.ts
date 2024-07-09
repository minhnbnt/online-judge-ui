import { decodeJwt } from 'jose';
import { derived } from 'svelte/store';

import { accessTokenStore } from '$lib/services/auth';

interface UserInfo {
	username: string;
	is_staff: boolean;
}

export const userInfo = derived(accessTokenStore, (token) => {
	if (token === undefined) {
		return undefined;
	}

	return decodeJwt<UserInfo>(token);
});
