import { derived, writable } from 'svelte/store';

import { fetchUserInfo } from '$lib/services/userInfo';
import { type UserInfoResponse } from '$lib/types/userInfo';

/* Please don't use this directly, use getAccessToken instead.
 * It will try to fetch new accessToken when needed */
export const accessTokenStore = writable<string | undefined>();

type AccessToken = typeof accessTokenStore;
type Response = UserInfoResponse | undefined;

let cachedAccessToken: string | undefined;

export const userInfo = derived<AccessToken, Response>(
	accessTokenStore,

	(token, set) => {
		/* sometime it trigger this function even if access token not changed :(((
		 * so we will make a guard to prevent redundant fetch because it's expensive */
		const accessTokenUpdated = cachedAccessToken !== token;
		if (!accessTokenUpdated) {
			return;
		}

		if (token === undefined) {
			return;
		}

		fetchUserInfo(token).then((value) => set(value));
		cachedAccessToken = token;
	},

	undefined
);
