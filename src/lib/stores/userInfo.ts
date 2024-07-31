import { decodeJwt } from 'jose';
import { Mutex } from 'async-mutex';
import { get, readonly, writable } from 'svelte/store';

import { instance } from '$lib/services/api';
import { getAccessToken } from '$lib/services/auth';
import { type UserInfoResponse } from '$lib/types/userInfo';

const userInfoStore = writable<UserInfoResponse | undefined>();
export const userInfo = readonly(userInfoStore);

const mutex = new Mutex();

// we must use lambda function :0
const refreshUserInfo = (accessToken: string | undefined) =>
	mutex.runExclusive(async () => {
		if (accessToken === undefined) {
			userInfoStore.set(undefined);
			return;
		}

		const userInfo = get(userInfoStore);
		const idToken = getUserId(accessToken);

		/* this will avoid both recursive and fetch twice
		 * just make sure userId returned equals with ones in accessToken */
		if (idToken === userInfo?.id) {
			return;
		}

		const config = {
			headers: { Authorization: `Bearer ${accessToken}` }
		};

		const response = await instance.get(`/users/info/${idToken}`, config);
		const info = response.data as UserInfoResponse;

		userInfoStore.set(info);
	});

function getUserId(accessToken: string) {
	const { user_id } = decodeJwt(accessToken);
	return user_id as number;
}

/* Please don't use this for requests, use getAccessToken instead.
 * It will try to fetch new accessToken when needed */
export const accessTokenStore = writable<string | undefined>();
accessTokenStore.subscribe(async (token) => refreshUserInfo(token));

export async function getUserInfo() {
	const accessToken = await getAccessToken();
	await refreshUserInfo(accessToken);

	return get(userInfoStore);
}
