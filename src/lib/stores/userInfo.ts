import { decodeJwt } from 'jose';
import { derived, writable } from 'svelte/store';

export const accessTokenStore = writable<string | undefined>();

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
