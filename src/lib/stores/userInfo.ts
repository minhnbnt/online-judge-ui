import { decodeJwt } from 'jose';
import { Mutex } from 'async-mutex';
import { derived, get, readonly, writable } from 'svelte/store';

import { instance } from '$lib/services/api';
import { type UserInfoResponse } from '$lib/types/userInfo';
import { getAccessToken, getAuthConfig } from '$lib/services/auth';

interface TokenPayload {
	token_type: string;
	user_id: number;
	exp: number;
	iat: number;
	jti: string;
}

const userInfoStore = writable<UserInfoResponse | undefined>();
export const userInfo = readonly(userInfoStore);

/* Please don't use this for requests, use getAccessToken instead.
 * It will try to fetch new accessToken when needed */
export const accessTokenStore = writable<string | undefined>();

export const accessTokenPayload = derived(accessTokenStore, (token) => {
	if (token === undefined) {
		return undefined;
	}

	return decodeJwt<TokenPayload>(token);
});

const mutex = new Mutex();

// we must use lambda function :0
const refreshUserInfo = async (accessToken: string | undefined) => {
	return await mutex.runExclusive(async () => {
		if (accessToken === undefined) {
			userInfoStore.set(undefined);
			return;
		}

		const userInfo = get(userInfoStore);
		const payload = get(accessTokenPayload);

		/* this will avoid both recursive and fetch twice
		 * just make sure userId returned equals with ones in accessToken */
		if (payload?.user_id === userInfo?.id) {
			return;
		}

		await fetchNewInfo();
	});
};

accessTokenStore.subscribe(refreshUserInfo);

async function fetchNewInfo() {
	const payload = get(accessTokenPayload);
	if (payload === undefined) {
		userInfoStore.set(undefined);
		return undefined;
	}

	const config = await getAuthConfig();
	const userId = payload.user_id;

	const response = await instance.get(`/users/info/${userId}`, config);
	const info = response.data as UserInfoResponse;

	userInfoStore.set(info);
	return info;
}

export async function getUserInfo() {
	const accessToken = await getAccessToken();
	await refreshUserInfo(accessToken);

	return get(userInfoStore);
}
